from flask import Blueprint, jsonify
from db import get_db
import time
from datetime import datetime

health_bp = Blueprint('health', __name__, url_prefix='/api')

start_time = time.time()

@health_bp.route('/health', methods=['GET'])
def health_check():
    db = get_db()
    status = {
        'status': 'healthy',
        'uptime_seconds': round(time.time() - start_time, 2),
        'timestamp': datetime.now().isoformat(),
        'services': {
            'database': 'unknown'
        }
    }
    
    try:
        db.command('ping')
        status['services']['database'] = 'connected'
    except Exception as e:
        status['status'] = 'unhealthy'
        status['services']['database'] = 'disconnected'
        status['error'] = str(e)
        return jsonify(status), 503

    return jsonify(status), 200
