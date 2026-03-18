from flask import Flask
from flask_restx import Api, Resource, fields
from flask_cors import CORS  # <--- IMPORTANTE: Instalar con 'pip install flask-cors'

from src.factories.medieval_world import MedievalWorld
from src.factories.futuristic_world import FuturisticWorld
from src.game_world import GameWorld

from src.builders.game_world_builder import GameWorldBuilder 

app = Flask(__name__)

# Habilitar CORS para que React (puerto 5173 o 3000) pueda consultar la API
CORS(app) 

api = Api(
    app,
    version="1.0",
    title="Videojuego API",
    description="API para la simulación de mundos usando Abstract Factory",
    doc="/docs"
)

ns = api.namespace("TipodeJuego", description="Operaciones sobre el mundo del juego")

world_model = api.model(
    "WorldRequest",
    {
        "world": fields.String(required=True, description="Tipo de mundo (medieval o futuristic)"),
        "level": fields.String(required=False, description= "El nivel del héroe"),
        "difficulty": fields.String(required=False, description= "La dificultad de los enemigos")
    }
)

@ns.route('/world')
class WorldResource(Resource):

    @ns.expect(world_model)
    def post(self):
        try:
            data = api.payload
            world_type = data.get("world")
            level= data.get("level")
            difficulty= data.get("difficulty")

            # Selección de la fábrica según el patrón Abstract Factory
            if world_type == "medieval":
                factory = MedievalWorld()
            elif world_type == "futuristic":
                factory = FuturisticWorld()
            else:
                return {"Error": "Tipo de mundo inválido"}, 400

            # Inyectamos la fábrica en el controlador del mundo
            builder= GameWorldBuilder(factory)
            
            # Obtenemos el resultado (asegúrate que world.play() devuelva un dict)
            world = (
                builder
                .setLevel(level)
                .setDifficulty(difficulty)
                .build()
            )

            result= world.play()
            # Agregamos una bandera de éxito para que el front lo procese mejor
            return {
                "status": "success",
                "data": result, 
            }, 200
            
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500


@app.route("/")
def home():
    return {"message": "Flask API running"}, 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)