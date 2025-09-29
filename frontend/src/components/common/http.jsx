export const apiUrl = "http://127.0.0.1:8000/api";

export const adminToken = () => {
    const data = JSON.parse(localStorage.getItem('adminInfo'));

    return data.token;
}

export const userToken = () => {
    const data = JSON.parse(localStorage.getItem('userInfo'));

    return data.token;
}

export const STRIPE_PUBLIC_KEY = 'pk_test_51SCPHFSsyeFzZk8BL3Ap2LAJABnRBdqxeluGEUROAlKN54QB22VROXloNvGAFkm4pccSa2bJZ3o3e1a7jBRMKI9Z00smIIJUH9'