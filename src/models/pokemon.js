export const pokemon_model = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
                validate: {
                    isInt: { msg: "utilisez uniquement des nombres entier entier dans le champ hp " },
                    notNull: { msg: "les points de vie ne doivent pas être null / doivent toujours contenir une valeur" }
                }
            
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false ,
            validate: {
                isInt: { msg: "utilisez uniquement des nombres entier dans le champ cp " },
                notNull: { msg: "le champ  ne doit  pas être null / doivent toujours contenir une valeur" }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',');
            },
            set(types) {
                this.setDataValue('types', types.join())
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}