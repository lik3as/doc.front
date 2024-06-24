/****************************************************************************************
 *																			            *
 * Dashboard IDFACE.tech                                                              	*
 * Copyright (C) POWER BI TECH                          			                        *
 * DEVS: Gabriel Camargo & Marcelo Medina                                          		*
 *                                                                                      *
 ***************************************************************************************/

/**
 * COMPONENTES E FUNÇÕES
 */

function mixinShow(icon, title, html = null) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });
    Toast.fire({
        icon: icon,
        title: title,
        html: html
    });
}


function fireTimeShow(icon, title, time, html = null) {
    let timerInterval;
    Swal.fire({
        title: title,
        icon: icon,
        html: html,
        timer: time,
        timerProgressBar: true,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        },
    }).then(() => {
        clearInterval(timerInterval);
    });
}


function change_tab(tab_name) {
    var someTabTriggerEl = document.querySelector('a[href="' + tab_name + '"]');
    document.querySelector('#auth-active-slide').innerHTML = someTabTriggerEl.getAttribute('data-slide-index');
    var actTab = new bootstrap.Tab(someTabTriggerEl);
    actTab.show();
}


/**
 * VALIDADORES DE DADOS
 */

function isValidEmail(email) {
    /**
     * Verifica se o e-mail possui um formato válido.
     * @param {string} email O e-mail a ser verificado.
     * @returns {boolean} Retorna true se o e-mail for válido, caso contrário, retorna false.
     */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;

    return cpf;
}


function isValidCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(0))) return false;

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(1))) return false;

    return cnpj;
}


function isValidPassword(password, passwordConfirm) {
    if (password !== passwordConfirm) {
        return '<p class="text-alert"><i class="feather icon-alert-triangle"></i> As senhas não coincidem.<p/>';
    } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        let errorMessage = '';

        if (!passwordRegex.test(password)) {
            if (password.length < 8) {
                errorMessage += '<p class="text-alert"><i class="feather icon-alert-triangle"></i> Pelo menos 8 caracteres<p/>';
            }
            if (!/(?=.*[a-z])/.test(password)) {
                errorMessage += '<p class="text-alert"><i class="feather icon-alert-triangle"></i> A senha deve conter pelo menos uma letra minúscula (a-z).<p/>';
            }
            if (!/(?=.*[A-Z])/.test(password)) {
                errorMessage += '<p class="text-alert"><i class="feather icon-alert-triangle"></i> A senha deve conter pelo menos uma letra maiúscula (A-Z).<p/>';
            }
            if (!/(?=.*\d)/.test(password)) {
                errorMessage += '<p class="text-alert"><i class="feather icon-alert-triangle"></i> A senha deve conter pelo menos um número (0-9).<p/>';
            }
            if (!/(?=.*[@$!%*?&])/.test(password)) {
                errorMessage += '<p class="text-alert"><i class="feather icon-alert-triangle"></i> A senha deve conter pelo menos um caractere especial.<p/>';
            }

            return errorMessage;
        }
    }

    return true;
}


/**
 * REQUISIÇÕES NA API
 */

async function isUser(email) {
    const url = 'https://dash.idface.tech/users/isUser';

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({ 'email': email });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error('There was an error!', error);
        return null;
    }
}


async function signup(name, cpf, phone, email, password) {
    const url = 'https://dash.idface.tech/users/signup';

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(
        {
            'nome': name,
            'cpf': cpf,
            'phone': phone,
            'email': email,
            'password': password
        }
    );

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error('There was an error!', error);
        return null;
    }
}


async function companyUp(reasonSocial, cnpj, phone, email) {
    const url = 'https://dash.idface.tech/users/companyup';
    const token = localStorage.getItem('token');

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const raw = JSON.stringify(
        {
            "razaoSocial": reasonSocial,
            "cnpj": cnpj,
            "phone": phone,
            "email": email
        }
    );

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error('There was an error!', error);
        return null;
    }
}



/**
 * LEITURA DE EVENTOS DE CLIQUE
 */

document.querySelector('.auth-email').addEventListener('click', function () {
    /**
     * Verifica se o e-mail já está cadastrado.
     */
    fireTimeShow(null, null, 1000, html = 'Verificando se você já tem uma conta.');

    const email = document.getElementById('email').value;

    if (isValidEmail(email)) {
        isUser(email)
            .then(response => {
                let tab_name = '#auth-3';
                let lenSteps = '3';

                if (response && response.code === 200) {
                    if (response.data.continue === true) {
                        lenSteps = '6';
                        tab_name = '#auth-4';
                    }
                } else {
                    mixinShow('warning', 'Estamos com problemas em nossos servidores.');
                }

                document.getElementById('len-steps').innerText = lenSteps;
                change_tab(tab_name);
            })
            .catch(error => {
                console.error('Erro ao processar a requisição:', error);
            });

    } else {
        mixinShow('warning', 'Informe um endereço de e-mail válido.');
        return;
    }
});


document.querySelector('.auth-use').addEventListener('click', function () {
    var selectedOption = document.querySelector('input[name="options"]:checked').id;
    if (selectedOption === 'Pessoal') {
        // DESCOMENTAR QUANDO HABILITAR - INICIO
        // document.getElementById('len-steps').innerText = '5';
        // DESCOMENTAR QUANDO HABILITAR - FIM
        fireTimeShow('warning', 'Por enquanto não temos disponível o IDFACE para uso pessoal.', 5000);
    } else {
        change_tab('#auth-5');
    }
});


document.querySelector('.auth-user').addEventListener('click', function () {
    const name = document.getElementById('name').value.toUpperCase();
    let cpf = document.getElementById('cpf').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password-create').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    cpf = isValidCPF(cpf);
    if (cpf === false) {
        mixinShow('warning', 'Verifique se o CPF informado está correto.');
        return;
    }

    var validPassword = isValidPassword(password, passwordConfirm);
    if (validPassword !== true) {
        mixinShow('error', false, html = validPassword);
        return;
    }

    signup(name, cpf, phone, email, password).then(response => {
        if (response && response.code === 200) {
            if (response.data.token !== null) {
                const token = response.data.token;
                localStorage.setItem('token', token);

                var selectedOption = document.querySelector('input[name="options"]:checked').id;
                if (selectedOption !== 'Pessoal') {
                    change_tab('#auth-6');
                }
            }
        } else {
            change_tab('#auth-2');
            mixinShow('warning', 'Estamos com problemas em nossos servidores.');
        }
    });
});

document.querySelector('.auth-company').addEventListener('click', function () {
    const reasonSocial = document.getElementById('reason-social').value.toUpperCase();
    let cnpj = document.getElementById('cnpj').value;
    const phone = document.getElementById('phone-company').value;
    const email = document.getElementById('email').value;

    cnpj = isValidCNPJ(cnpj);
    if (cnpj === false) {
        mixinShow('warning', 'Verifique se o CNPJ informado está correto.');
        return;
    }

    companyUp(reasonSocial, cnpj, phone, email).then(response => {
        if (response && response.code === 201) {
            change_tab('#auth-7');
        } else {
            change_tab('#auth-2');
            mixinShow('warning', 'Estamos com problemas em nossos servidores.');
        }

    });
});

document.querySelector('.auth-conf').addEventListener('click', function () {
    fireTimeShow('info', 'Aguarde, estamos verificando o código que você informou.', 2000);
});

