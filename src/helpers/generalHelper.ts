

export function getOffset(currentPage = 1, listPerPage:number) {
    return (currentPage - 1) * listPerPage;
  }
  
export function emptyOrRows(rows:any) {
    if (!rows) {
      return null;
    }
    return rows;
  }

 export function getDefault(rows:any)
 {
  if(!rows  || rows.length == 0){
    return null;
  }
  return rows[0];
 } 

 export function getUTCDate()
 {
  return new Date(Date.now());
 }
 export function getMaxDate()
 {
  return new Date('9999-12-31');
 }

 export function formatDate(date:Date) {
  const options:any = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date).replace(',', '').toString();
}


 export function isNull<T>(value:T) : boolean
 {
    if(value == null || value==undefined ){
      return true;
    }
    return false;  
 }

 export function isJson(data: any): boolean {
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data);
      return typeof parsed === "object" && parsed !== null;
    } catch (e) {
      return false;
    }
  }
  return isJsonObject(data);
}

function isJsonObject(obj: any): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}
export function hasProperties(obj: object, properties: string[]): boolean {
  return properties.every(prop => Object.prototype.hasOwnProperty.call(obj, prop));
}

export function _parse(obj: any)
{
  try{
    return JSON.parse(obj);
  }
  catch(e){
    return null;
  }
}


