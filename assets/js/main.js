
window.addEventListener('load', () => {
    alert("You can find contacts typing their name,surname,phone on search box\n\nSearch box ilə kontaktları adlarına,soyadlarına,nömrələrinə görə axtara bilərsiniz")

    let contacts = JSON.parse(localStorage.getItem('data'))
    const contact = $('.content').children('.contacts')
    const edit = $('#editBody').children('#group')
    const addContact = $('#addContact')
    const username = $('#username')
    const usersurname = $('#usersurname')
    const userphone = $('#userphone')

    const getContact = (name, surname, phone,id) => {
        contact.append(`
    <li class="contact" data-id=${id} data-toggle="modal" data-target="#editContactModal">
        <div class="contact-info" data-id=${id}>
            <img src="./assets/img/favicon.ico" data-id=${id}>
            <div data-id=${id}>
                <div data-id=${id} class="contact-name text-capitalize">${name + '<br>' + surname}</div>
                <div data-id=${id} class="contact-number">${phone}</div>
            </div>
        </div>
        <div class="call-box">
            <i class="fa fa-envelope"></i>
            <i class="fa fa-phone"></i>
        </div>
    </li>
    `)
    }
    //get contacts
    if (contacts) {
        contacts.forEach(info => {
            if(info != 'deleted'){
                getContact(info.name, info.surname, info.phone,info.id)
            }
        })
    }
    else if (!contacts) {
        contacts = []
    }

    //add contacts
    addContact.click(() => {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        if (username.val() && usersurname.val() && userphone.val()) {

            getContact(username.val(), usersurname.val(), userphone.val(),contacts.length)

            contacts.push({
                id:contacts.length,
                name: username.val(),
                surname: usersurname.val(),
                phone: userphone.val(),
                time: day + '/' + month + '/' + year
            })

            localStorage.setItem('data', JSON.stringify(contacts))
            username.val('')
            usersurname.val('')
            userphone.val('')
            $('.close').click()
        }
    })

    //search contacts
    $('.search-input').on('change paste keyup', () => {
        contact.html('')
        contacts.forEach(info => {
            if(info != 'deleted'){
                if ($('.search-input').val()) {
                    if (info.name.includes($('.search-input').val()) || info.surname.includes($('.search-input').val()) || info.phone.includes($('.search-input').val())) {
                        getContact(info.name, info.surname, info.phone,info.id)
                    }
                }
                else {
                    getContact(info.name, info.surname, info.phone,info.id)
                }
            }
        })
    })

    //edit
    $(document).on('click','.contact',(e) => {
        let dataId = e.target.getAttribute('data-id')
        edit.html('')
        edit.append(`
        <span>Last update:${contacts[dataId].time}</span>
        <input maxlength="15" data-id=${dataId} id="editname" class="add-input" type="text" value=${contacts[dataId].name}>
        <input maxlength="15" id="editsurname" class="add-input" type="text" value=${contacts[dataId].surname}>
        <input id="editphone" class="add-input" type="number" value=${contacts[dataId].phone}>
        <button id="delBtn" data-key=${dataId} class="btn btn-danger mt-1" style="width:100%">Delete</button>
        `)
    })

    //delete
    $(document).on('click','#delBtn',(e) => {
        let dataId = e.target.getAttribute('data-key')
        contacts.forEach((info,index) => {
            if(index == dataId){
                contacts[dataId] = 'deleted'
            }
        })
        localStorage.setItem('data',JSON.stringify(contacts))
        contact.html('')
        contacts.forEach(info => {
            if(info != 'deleted'){
                getContact(info.name,info.surname,info.phone,info.id)
            }
        })
        $('.close').click()
    })

    $('#editContact').click(() => {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        let editname = $('#editname')
        let editsurname = $('#editsurname')
        let editphone = $('#editphone')
        contacts[editname.attr('data-id')].name = editname.val()
        contacts[editname.attr('data-id')].surname = editsurname.val()
        contacts[editname.attr('data-id')].phone = editphone.val()
        contacts[editname.attr('data-id')].time = day + '/' + month + '/' + year
        localStorage.setItem('data',JSON.stringify(contacts))
        contact.html('')
        contacts.forEach(info => {
            if(info != 'deleted'){
                getContact(info.name,info.surname,info.phone,info.id)
            }
        })
        $('.close').click()
    })
})
