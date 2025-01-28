// AlertService.js
import Swal from 'sweetalert2';
// import "../assets/AlertStyle.css";

export const showConfirm = (title: string, text: string) => {
  Swal.close();
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#e0e0e0',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button',
    },
    buttonsStyling: false // Asegura que SweetAlert2 no sobreescriba tus estilos
  });
};

export const showConfirmDelete = () => {
  Swal.close();
  return Swal.fire({
    title: '¿Confirmas la eliminación del registro?',
    text: 'Esta acción es irreversible.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#e0e0e0',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button',
    },
    buttonsStyling: false // Asegura que SweetAlert2 no sobreescriba tus estilos
  });
};

export const showconfirmExit = () => {
  Swal.close();
  return Swal.fire({
    title: '¿Está seguro de salir?',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#e0e0e0',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    allowOutsideClick: false,
    customClass: {
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button',
    },
    buttonsStyling: false // Asegura que SweetAlert2 no sobreescriba tus estilos
  });
};


export const showConfirmCreation = () => {
  Swal.close();
  return Swal.fire({
    title: '¿Confirmas el alta del registro?',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#e0e0e0',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button',
      popup: 'swal-popup'
    },
    buttonsStyling: false // Asegura que SweetAlert2 no sobreescriba tus estilos
  });
};

export const showConfirmUpdate = () => {
  Swal.close();
  return Swal.fire({
    title: '¿Confirmas la modificación del registro?',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#e0e0e0',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button',
    },
    buttonsStyling: false // Asegura que SweetAlert2 no sobreescriba tus estilos
  });
};


export const showError = (text: string) => {
  Swal.close();
  return Swal.fire({
    icon: "error",
    title: "Lo sentimos...",
    confirmButtonText: 'Entendido.',
    confirmButtonColor: '#226580',
    text: text,
    allowOutsideClick : false,
    allowEscapeKey: false,
    customClass: {
      popup: 'swal2-error-popup',
    },
  });
};

export const showSuccess = (text: string) =>{
    Swal.close();
    return  Swal.fire({
        icon: "success",
        title: text,
        showConfirmButton: false,
        timer: 1200,
      });
};