import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Chips from "primevue/chips";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import AutoComplete from "primevue/autocomplete";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Row from "primevue/row";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import InputMask from "primevue/inputmask";
import InputSwitch from "primevue/inputswitch";
import RadioButton from "primevue/radiobutton";
import Textarea from "primevue/textarea";
import ToggleButton from "primevue/togglebutton";
import Skeleton from "primevue/skeleton";
import ProgressBar from "primevue/progressbar";
import ProgressSpinner from "primevue/progressspinner";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
import Badge from "primevue/badge";
import Menubar from 'primevue/menubar';
import Message from "primevue/message";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Image from 'primevue/image';
import Divider from 'primevue/divider';
import FileUpload from 'primevue/fileupload';
import Listbox from 'primevue/listbox';

import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import ToastService from "primevue/toastservice";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.use(ConfirmationService);
  nuxtApp.vueApp.use(DialogService);
  nuxtApp.vueApp.use(ToastService);

  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("Calendar", Calendar);
  nuxtApp.vueApp.component("Chips", Chips);
  nuxtApp.vueApp.component("Dropdown", Dropdown);
  nuxtApp.vueApp.component("Checkbox", Checkbox);
  nuxtApp.vueApp.component("AutoComplete", AutoComplete);
  nuxtApp.vueApp.component("DataTable", DataTable);
  nuxtApp.vueApp.component("Row", Row);
  nuxtApp.vueApp.component("Column", Column);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("InputNumber", InputNumber);
  nuxtApp.vueApp.component("InputMask", InputMask);
  nuxtApp.vueApp.component("InputSwitch", InputSwitch);
  nuxtApp.vueApp.component("RadioButton", RadioButton);
  nuxtApp.vueApp.component("Textarea", Textarea);
  nuxtApp.vueApp.component("ToggleButton", ToggleButton);
  nuxtApp.vueApp.component("Skeleton", Skeleton);
  nuxtApp.vueApp.component("ProgressBar", ProgressBar);
  nuxtApp.vueApp.component("ProgressSpinner", ProgressSpinner);
  nuxtApp.vueApp.component("Avatar", Avatar);
  nuxtApp.vueApp.component("AvatarGroup", AvatarGroup);
  nuxtApp.vueApp.component("Badge", Badge);
  nuxtApp.vueApp.component("Menubar", Menubar);
  nuxtApp.vueApp.component("Message", Message);
  nuxtApp.vueApp.component("Accordion", Accordion);
  nuxtApp.vueApp.component("AccordionTab", AccordionTab);
  nuxtApp.vueApp.component("Image", Image);
  nuxtApp.vueApp.component("Divider", Divider);
  nuxtApp.vueApp.component("FileUpload", FileUpload);


  nuxtApp.vueApp.component("Listbox", Listbox);
  nuxtApp.vueApp.component("FileUpload", FileUpload);
  nuxtApp.vueApp.component("FileUpload", FileUpload);
  //other components that you need
});
