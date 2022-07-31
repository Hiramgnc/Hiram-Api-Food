const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      },

    //Name = title
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_960_720.jpg"
    },

    //Resumen del Plato = summary
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //Puntuacion = spooncularScore 
    spoonacularScore: {
      type: DataTypes.INTEGER,
      validate: {
        min:0,
        max: 100
      }
    },

    // //Paso a paso = steps (que esta dentro de un arreglo (analized instructions)  => que contiene objetos )
    // steps: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },

    analyzedInstructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    //Nivel de "comida saludable" (health score)
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    },

    createdInDB: { 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
    
  }, {timestamps: false});
};
