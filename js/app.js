const loadPhones = async(searchText)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}
const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    //display 12 phones only
    const showAll = document.getElementById('show-all');
    if(phones.length > 12){
        phones = phones.slice(0,12);
    
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    
    //display no phones found
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none');
    }
   //display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `  
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="..." />
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">
                ${phone.slug}
            </p>
            </div>
      </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    //stop spinner or loader
    toggoleSpinner(false);
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    toggoleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
})

const toggoleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// loadPhones();

