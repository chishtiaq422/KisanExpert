import { sequelizedbConfig}  from '../config';
import { QueryOptions, QueryOptionsWithType, QueryTypes, Sequelize } from 'sequelize';
import {initModels } from '../models/entities/init-models';


class sequelizedb {
    db:Sequelize;
constructor(sequelize: Sequelize)
{
    this.db= sequelize;
    initModels(this.db);
    //this.db.Sequelize.useCLS();
}

isConnected(): boolean
{
    try {
         this.db.authenticate().then(()=>{
           // initModels(this.db);
            console.log('Connection has been established successfully.');
            return true;
        },(error:any)=>{
            console.error('Unable to connect to the database:', error);
        }
        );
      } 
      catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      return false;
}

async callStoredProcedure(query:string | { query: string; values: unknown[] }, options?: QueryOptions | QueryOptionsWithType<QueryTypes.RAW>):Promise<unknown>
{
    var resultSet;
    // try {
       var response= await this.db.query(query,options);
       if(response!= null)
       {
       resultSet= this.getlastArray(response[0] as []);
       }
    //  } 
    //  catch (error) {
    //    console.error('Unable to connect to the database:', error);
    //  }
    return resultSet;
}


getlastArray(array:[]):[]
{
   if(array[array.length-1][0])
   {
     return this.getlastArray(array[array.length-1]);
   } 
   else
   return array;
}

}
export default new sequelizedb(new Sequelize(sequelizedbConfig));