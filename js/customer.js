const themeToggle = document.querySelector(".theme-toggler")

// set dark color theme
themeToggle.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme-variables');

    themeToggle.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggle.querySelector('span:nth-child(2)').classList.toggle('active');
})

class Customer {
    #id;
    #name;
    #address;
    #contact;
    #email;
    #image;

    constructor(id, name, address, contact, email, image) {
        this.#id = id;
        this.#name = name;
        this.#address = address;
        this.#contact = contact;
        this.#email = email;
        this.#image = image;
    }

    getCustomerId() {
        return this.#id;
    }
    getCustomerName() {
        return this.#name;
    }
    getCustomerAddress() {
        return this.#address;
    }
    getCustomerContact() {
        return this.#contact;
    }
    getCustomerEmail() {
        return this.#email;
    }
    getCustomerImage() {
        return this.#image;
    }
}
let id=undefined;
let name =
    document.getElementById('name');
let address =
    document.getElementById('address');
let contact =
    document.getElementById('contact');
let email =
    document.getElementById('email');
let image =
    document.getElementById('file');


const displayAlert = () => {
    let alert =
        document.getElementById('save_alert');
    alert.style.display = 'block';
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000)
}

const pushCustomer = async (customer) => {
    if (customerDatabase.push(customer)) {
        displayAlert();
        clearFields();
        loadTable();
    }
}

const clearFields = () => {
    name.value = '';
    address.value = '';
    contact.value = '';
    email.value = '';
    image.value= '';
}
const loadTable = () => {
    let tableBody = document.getElementById('table-body');

    tableBody.innerHTML = ''; // Clear the table body

    for (const customer of customerDatabase) {
        let tr = document.createElement('tr');

        tr.innerHTML = `
            <td>
                <div class="t-outer">
                    ${customer.getCustomerId()}
                </div>
            </td>
            <td>
                <div class="t-outer">
                    ${customer.getCustomerName()}
                </div>
            </td>
            <td>
                <div class="t-outer">
                    ${customer.getCustomerAddress()}
                </div>
            </td>
            <td>
                <div class="t-outer">
                    ${customer.getCustomerContact()}
                </div>
            </td>
            <td>
                <div class="t-outer">
                    ${customer.getCustomerEmail()}
                </div>
            </td>
            <td>
                <div class="t-outer">
                    <img src="${customer.getCustomerImage()}" alt="Uploaded Image" id="image-preview" class="img-circle">
                </div>
            </td>
            <td>
                <div class="t-outer">
                    <input type="button" onclick="readyToUpdate('${customer.getCustomerId()}')" value="Modify" class="btn btn-success">
                </div>
            </td>
            <td>
                <div class="t-outer">
                    <input type="button" onclick="deleteCustomer('${customer.getCustomerId()}')" class="btn btn-danger" value="Remove">
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    }
};


// Set data into form inputs
const setData = (data) => {
    id = data.getCustomerId(); // Store the customer ID for updating
    name.value = data.getCustomerName();
    address.value = data.getCustomerAddress();
    contact.value = data.getCustomerContact();
    email.value = data.getCustomerEmail();

   
    const imagePreview = document.getElementById('image-preview'); 
    imagePreview.src = data.getCustomerImage(); 
    imagePreview.style.display = 'block'; 

  
    document.getElementById('btnSaveUpdate').innerHTML = 'Update Customer';
};


const readyToUpdate = (customerId)=>{
    let selectedCustomer = customerDatabase.find((e)=>e.getCustomerId()==customerId);
    if(!selectedCustomer){
        alert('something went wrong...')
        return;
    }
    setData(selectedCustomer);

}


const deleteCustomer = (customerId)=>{
    if(confirm('Are you sure whether do you want to delete this customer?')){
        let selectedCustomer = customerDatabase.find((e)=>e.getCustomerId()==customerId);
        if(!selectedCustomer){
            alert('something went wrong...')
            return;
        }
        customerDatabase.splice(customerId,1);
        loadTable();
    }


}

let customerDatabase = []; //['','']

function generateCustomerId() {
    // customer id Format [C-1]
    if (customerDatabase.length == 0) {
        return 'C-1';
    }
    let selectedData =
        customerDatabase[customerDatabase.length - 1];
    if (!selectedData) {
        return null;
    } else {
        let selectedLastId =
            selectedData.getCustomerId().toString().split('-')[1]; // [C,5]
        selectedLastId++;
        return 'C-' + selectedLastId;
    }

}

const createUpdateCustomer = () => {
    const fileInput = document.getElementById('file'); 
    const file = fileInput.files && fileInput.files[0]; 

    if (!file) {
        alert('Please upload an image file.');
        return;
    }

    const reader = new FileReader(); 

    reader.onload = (event) => {
        const imageURL = event.target.result; 

        if (
            document.getElementById('btnSaveUpdate')
                .innerHTML.includes('Save Customer')
        ) {
            // Save operation
            let customer = new Customer(
                generateCustomerId(),
                name.value,
                address.value,
                contact.value,
                email.value,
                imageURL 
            );
            pushCustomer(customer);
            clearFields();
            loadTable();
        } else if (
            document.getElementById('btnSaveUpdate')
                .innerHTML.includes('Update Customer')
            && id
        ) {
            // Update operation
            let selectedIndex =
                customerDatabase.findIndex((selectedData) => selectedData
                    .getCustomerId() == id);
            if (selectedIndex != -1) {
                customerDatabase[selectedIndex] = new Customer(
                    id,
                    name.value,
                    address.value,
                    contact.value,
                    email.value,
                    imageURL 
                );
                clearFields();
                loadTable();
                document.getElementById('btnSaveUpdate')
                    .innerHTML = 'Save Customer';
            }
        }
    };

    reader.readAsDataURL(file); 
};
