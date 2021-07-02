export const dateFormat=(fecha)=>{

    let dayInicio=fecha.getDate()<10?'0'+fecha.getDate():fecha.getDate()
    let monthInicio=(fecha.getMonth()+1)<10?'0'+(fecha.getMonth()+1):(fecha.getMonth()+1)
    let fechaFinal=dayInicio+'/'+monthInicio+'/'+fecha.getFullYear()+" "+fecha.getTime()
    return fechaFinal
}
export const dateFormatA=(fecha)=>{

    let dayInicio=fecha.getDate()<10?'0'+fecha.getDate():fecha.getDate()
    let monthInicio=(fecha.getMonth()+1)<10?'0'+(fecha.getMonth()+1):(fecha.getMonth()+1)
    let fechaFinal=fecha.getFullYear()+'-'+monthInicio+'-'+dayInicio
    return fechaFinal
}
export const dateFormatB=(fecha)=>{

    let dayInicio=fecha.getDate()<10?'0'+fecha.getDate():fecha.getDate()
    let monthInicio=(fecha.getMonth()+1)<10?'0'+(fecha.getMonth()+1):(fecha.getMonth()+1)
    let fechaFinal=dayInicio+'/'+monthInicio+'/'+fecha.getFullYear()
    return fechaFinal
}
export const getHours=(fecha)=>{

    let fechaFinal=fecha.getHours()+':'+fecha.getMinutes()
    return fechaFinal
}
export const convertirDate=(dateString)=>{
    if(dateString!=""){
        
        let dateParts = dateString.split("/");
        let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
        return dateObject 
    }else{
        return '';
    }

}
