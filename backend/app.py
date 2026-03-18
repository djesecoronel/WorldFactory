from flask import Flask
from flask_restx import Api, Resource, fields
from flask_cors import CORS 

from src.factories.medieval_world import MedievalWorld
from src.factories.futuristic_world import FuturisticWorld
from src.builders.game_world_builder import GameWorldBuilder 

app = Flask(__name__)
CORS(app) 

api = Api(
    app,
    version="1.0",
    title="Videojuego API",
    description="API para la simulación de mundos usando Abstract Factory y Builder",
    doc="/docs"
)

ns = api.namespace("TipodeJuego", description="Operaciones sobre el mundo del juego")

# Modelo para la creación del mundo
world_model = api.model(
    "WorldRequest",
    {
        "world": fields.String(required=True, description="Tipo de mundo (medieval o futuristic)"),
        "level": fields.String(required=False, description="El nivel del héroe"),
        "difficulty": fields.String(required=False, description="La dificultad de los enemigos")
    }
)

# Nuevo Modelo para la lógica de ataque/combate
attack_model = api.model(
    "AttackRequest",
    {
        "enemy_hp": fields.Integer(required=True, description="Vida actual del enemigo"),
        "damage": fields.Integer(required=True, description="Daño realizado por el héroe")
    }
)

@ns.route('/world')
class WorldResource(Resource):

    @ns.expect(world_model)
    def post(self):
        try:
            data = api.payload
            world_type = data.get("world")
            
            # Limpieza de datos
            raw_level = data.get("level", 1)
            level = int(raw_level) if str(raw_level).isdigit() else 1
            difficulty = data.get("difficulty", "normal")

            # 1. Selección de la fábrica (Abstract Factory)
            if world_type == "medieval":
                factory = MedievalWorld()
            elif world_type == "futuristic":
                factory = FuturisticWorld()
            else:
                return {"status": "error", "message": "Tipo de mundo inválido"}, 400

            # 2. Uso del Builder
            builder = GameWorldBuilder(factory)
            world = (
                builder
                .setLevel(level)
                .setDifficulty(difficulty)
                .build()
            )

            # 3. Ejecución de la lógica del mundo
            result = world.play()
            
            return {
                "status": "success",
                "data": result, 
            }, 200
            
        except Exception as e:
            print(f"Error en el servidor: {e}")
            return {"status": "error", "message": str(e)}, 500

@ns.route('/attack')
class AttackResource(Resource):

    @ns.expect(attack_model)
    def post(self):
        try:
            data = api.payload
            current_hp = data.get("enemy_hp")
            damage = data.get("damage")

            # Cálculo de nueva vida
            new_hp = current_hp - damage
            
            # Lógica de muerte e inhabilitación
            if new_hp <= 0:
                return {
                    "status": "victory",
                    "hp": 0,
                    "animation": "Dead",      # El frontend debe cambiar al sprite de muerte
                    "isDisabled": True,       # Para bloquear botones en el frontend
                    "message": "Enemigo derrotado. Reentra al mundo para reiniciar."
                }, 200
            
            return {
                "status": "hit",
                "hp": new_hp,
                "animation": "Hurt",          # El frontend muestra feedback de daño
                "isDisabled": False
            }, 200

        except Exception as e:
            return {"status": "error", "message": str(e)}, 500

@app.route("/")
def home():
    return {"message": "Flask API running"}, 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)