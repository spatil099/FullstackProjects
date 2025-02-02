import './assets/main.css'
import 'primeicons/primeicons.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Button from "primevue/button";
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Password from 'primevue/password';
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import { Form } from '@primevue/forms';
import CascadeSelect from 'primevue/cascadeselect';
import FloatLabel from 'primevue/floatlabel';
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    },
});
app.use(ToastService);
app.component("Form",Form);
app.component("InputGroup", InputGroup);
app.component("InputGroupAddon", InputGroupAddon);
app.component("InputText", InputText);
app.component("Button", Button);
app.component("Toast", Toast);
app.component("Password", Password);
app.component("Message", Message);
app.component('CascadeSelect', CascadeSelect);
app.component('FloatLabel', FloatLabel);
app.mount('#app')
