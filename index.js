let zip=document.querySelector("#zipform")
zip.addEventListener("submit",information)
document.querySelector('body').addEventListener("click",erase)

function information(e){
    let zipcode=document.querySelector(".input").value;
    fetch(`http://api.zippopotam.us/us/${zipcode}`)  //some  zipcodes to try (01931  02132   91312  98512  95431)
        .then(response=>{
            if(response.status!=200){
                showIcon("check")
               
                document.querySelector("#output").innerHTML=
                `<article class="message is-danger">
                    <div class="message-body">
                        Invalid Zipcode
                    </div>
                </article>`;
                // throw Error(response.statusText)
            }else{
                showIcon("remove")
                return response.json()
              }
        })
        .then(data=>{
            let output=""
            data.places.forEach(place=>{
                output+=`<article class="message is-primary">
                    <div class="message-header ">
                        <p>Location Data</p>
                        <button class="delete"></button>
                    </div>
                    <div class="message-body">
                          <ul>
                            <li><strong>City:</strong>${place["place name"]}</li>
                            <li><strong>State:</strong>${place["state"]}</li>
                            <li><strong>Longitude:</strong>${place["longitude"]}</li>
                            <li><strong>Latitude:</strong>${place["latitude"]}</li>
                          </ul>
                    </div>
                </article>`
            })
            document.querySelector("#output ").innerHTML=output
        })
        .catch(err=>console.log(err))
    e.preventDefault();
}

function showIcon(icon){
    document.querySelector(".icon-remove").style.display="none";
    document.querySelector(".icon-check").style.display="none";
    //show correct icon
    document.querySelector(`.icon-${icon}`).style.display="inline-flex";
}

function erase(event){
    if(event.target.className=="delete"){
        document.querySelector(".message").remove();
        document.querySelector(".zip").value=""
    }
}