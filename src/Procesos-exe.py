from flask import Flask, jsonify
from flask_cors import CORS
import psutil
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

def obtener_aplicaciones():
    aplicaciones = []
    for proceso in psutil.process_iter(['pid', 'name', 'username', 'exe', 'create_time']):
        if proceso.info['username'] is not None and proceso.info['exe']:
            exe_path = proceso.info['exe'].lower()
            filename = os.path.basename(exe_path)
            if filename.endswith('.exe'):
                aplicaciones.append({
                    'time': datetime.fromtimestamp(proceso.info['create_time']).strftime("%H:%M:%S"),
                    'url': filename
                })
    return aplicaciones

@app.route('/historial', methods=['GET'])
def historial():
    return jsonify(obtener_aplicaciones())

if __name__ == '__main__':
    app.run(debug=True)
