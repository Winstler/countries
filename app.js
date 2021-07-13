setTimeout(function(){

    let headTag = document.head;

    let linkTag = document.createElement('link');
        linkTag.rel = 'stylesheet';
        linkTag.href = './styles.css';

    headTag.insertAdjacentElement('beforeend', linkTag);

}, 1000);



(async function(){
                const URL_currencies = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
                let curencies = await fetch(URL_currencies);
                curencies = await curencies.json();

                console.log(curencies);

                const URL_countries = 'https://restcountries.eu/rest/v2/all';
                let countries = await fetch(URL_countries);
                countries = await countries.json();

                console.log(countries);

                let countries_true = []

                function countries_check (a, b){ //a == currencies, b == countries
                    for (let i = 0;i<=a.length-1;i++){
                        for (let j = 0; j <= b.length-1 ;j++){
                            if(a[i].cc == b[j].currencies[0].code){
                                countries_true.push(b[j]);
                                countries_true[countries_true.length-1].valuta = b[j].currencies[0].code;
                            }
                            else{
                                if(b[j].currencies[1] != undefined && a[i].cc == b[j].currencies[1].code){
                                    countries_true.push(b[j]);
                                    countries_true[countries_true.length-1].valuta = b[j].currencies[1].code;
                                }
                                else{
                                    if(b[j].currencies[2] != undefined && a[i].cc == b[j].currencies[2].code){
                                        countries_true.push(b[j]);
                                        countries_true[countries_true.length-1].valuta = b[j].currencies[2].code;
                                    }
                                    else{
                                        continue;
                                    }  
                                }
                            }
                        }
                    }
                }
                countries_check(curencies, countries);
                console.log(countries_true);

                let searched_cur = '';

                let cur = '';
                let date = curencies[0].exchangedate;

                for (let k = 0; k <= countries_true.length - 1; k++){
                    searched_cur = countries_true[k].valuta;
                    for (let m = 0; m <= curencies.length - 1; m++){
                        if (searched_cur == curencies[m].cc){
                            cur = curencies[m].rate;
                        }
                        else{
                            continue;
                        }
                    } 
                    document.write(`<p class='content' id='parent${k}'>${countries_true[k].name}(${countries_true[k].valuta})        Курс: ${cur};    Дата: ${date}</p><br>`);
                    let parent = document.querySelector(`#parent${k}`);
                    let divChilde = document.createElement('div');
                    divChilde.id = `div${k}`;
                    parent.appendChild(divChilde);
                    let parentDiv = document.getElementById(`div${k}`);
                    let imgChild = document.createElement('img');
                    imgChild.src = countries_true[k].flag;
                    parentDiv.appendChild(imgChild);
                }
            })();
