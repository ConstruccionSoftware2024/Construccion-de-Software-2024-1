import psutil
import time
import os
import numpy as np
from sklearn.ensemble import IsolationForest

# Función para obtener las características de los procesos .exe
def obtener_caracteristicas():
    caracteristicas = {}
    for proceso in psutil.process_iter(['pid', 'name', 'username', 'cpu_percent', 'memory_percent']):
        nombre_app = proceso.info['name']
        if proceso.info['username'] is not None and nombre_app.endswith('.exe'):
            if nombre_app not in caracteristicas:
                caracteristicas[nombre_app] = {
                    'pid': proceso.info['pid'],
                    'cpu_percent': proceso.info['cpu_percent'],
                    'memory_percent': proceso.info['memory_percent']
                }
            else:
                caracteristicas[nombre_app]['cpu_percent'] += proceso.info['cpu_percent']
                caracteristicas[nombre_app]['memory_percent'] += proceso.info['memory_percent']

    return caracteristicas

# Monitorear los procesos y detectar anomalías
def monitorear_procesos():
    # Obtener datos iniciales
    datos_iniciales = obtener_caracteristicas()

    while True:
        os.system('cls' if os.name == 'nt' else 'clear')
        caracteristicas = obtener_caracteristicas()
        
        print(f"Actualizado: {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
        
        for nombre_app, proc in caracteristicas.items():
            print(f"Nombre de la aplicación: {nombre_app}")
        
        time.sleep(5)

# Ejecutar la función de monitoreo
monitorear_procesos()
