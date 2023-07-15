const container=document.getElementById('container');
let metlList=[];
let tw=[],out_si=[],Municipal_new=[],Municipal=["金門縣","連江縣","澎湖縣"];

function onlong(thisValue){
    fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-8F61116C-E1C0-482C-BEED-06AC6294E383&elementName=")
        .then(res => res.json())
        .then(data => {
            tw=[];out_si=[];Municipal_new=[];
            metlList=data;
            console.log(metlList);
            const lo_Name=metlList.records.location;

            Object.keys(lo_Name).forEach((index,item)=>{
                if(Municipal.includes(lo_Name[index].locationName)===false){
                    if(lo_Name[index].locationName.includes("縣")){
                        tw.push(lo_Name[index]);
                    }
                    else{
                        out_si.push(lo_Name[index]);
                    }
                }else{
                    Municipal_new.push(lo_Name[index])
                }
            });

            let all=[tw,out_si,Municipal_new];
            console.log(all[thisValue]);

            let content="";  // 內容物 天氣、溫度、地區
            let container_flex="";  // 兩個一行

            Object.keys(all[thisValue]).forEach((index,item)=>{
                const weather_view=+all[thisValue][index].weatherElement[0].time[1].parameter.parameterValue;
                content += `<div class="content">
                                <div>
                                    <div class="loca_weather">
                                        <h1 id="County">${all[thisValue][index].locationName}</h1>  
                                        <p id="weather">${all[thisValue][index].weatherElement[0].time[1].parameter.parameterName}</p>
                                    </div> 
                                    <span id="CF">${all[thisValue][index].weatherElement[2].time[1].parameter.parameterName} - ${all[thisValue][index].weatherElement[4].time[1].parameter.parameterName} °C</span>
                                </div>
                                <i id="weather_new" class="${weather_icon(weather_view)}"></i>
                            </div>`

                if(+index+1===Object.keys(all[thisValue]).length || index%2===1){
                    container_flex += `<div class="container_flex">${content}</div>`
                    content="";
                }
                container.innerHTML=container_flex;
            
            });     
    })
}

function weather_icon(index_icon){
    switch(index_icon){
        case 1 :
            return "fa-solid fa-sun";
        case 2 : case 3:
            return "fa-solid fa-cloud-sun";
        case 4 : case 5 : case 6 : case 7:
            return "fa-solid fa-cloud";
        case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 29:
            return "fa-solid fa-cloud-showers-heavy";
        case 15: case 16: case 17: case 18:
            return "fa-solid fa-cloud-bolt";
        case 19: case 20: case 21: case 22: case 30:
            return "fa-solid fa-cloud-sun-rain";
        case 23: case 42:
            return "fa-solid fa-snowflake";
        case 24: case 25: case 26: case 27: case 28:
            return "fa-solid fa-smog";
        default:
            return "fa-solid fa-cloud-rain";
    } 
}

