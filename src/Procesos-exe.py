from flask import Flask, jsonify
from flask_cors import CORS
import psutil
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

historial_procesos = []  # Lista para mantener el historial de procesos

def obtener_aplicaciones():
    global historial_procesos

    # Obtener todos los procesos activos en este momento
    procesos_activos = []
    for proceso in psutil.process_iter(['pid', 'name', 'username', 'exe', 'create_time']):
        if proceso.info['username'] is not None and proceso.info['exe']:
            exe_path = proceso.info['exe'].lower()
            filename = os.path.basename(exe_path)
            if filename.endswith('.exe'):
                proceso_id = proceso.info['pid']
                proceso_name = proceso.info['name']
                
                # Filtrar procesos propios de Windows
                if not es_proceso_windows(proceso_name):
                    # Verificar si el proceso ya está en historial_procesos (por nombre)
                    if not any(p['name'] == proceso_name for p in procesos_activos):
                        procesos_activos.append({
                            'pid': proceso_id,
                            'name': proceso_name,
                            'time': datetime.fromtimestamp(proceso.info['create_time']).strftime("%H:%M:%S"),
                            'url': filename
                        })

    # Actualizar historial_procesos con nuevos procesos activos
    historial_procesos[:] = procesos_activos

    # Devolver todos los procesos activos en esta solicitud
    return procesos_activos

def es_proceso_windows(nombre_proceso):
    # Función para determinar si un proceso es propio de Windows
    procesos_windows = ['explorer.exe', 'svchost.exe', 'system.exe']  # Ejemplos de procesos de Windows
    return nombre_proceso.lower() in procesos_windows

@app.route('/historial', methods=['GET'])
def historial():
    return jsonify(obtener_aplicaciones())

if __name__ == '__main__':
    app.run(debug=True)
