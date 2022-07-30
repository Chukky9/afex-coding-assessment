export const alert = (message = '', type = 'info') => {
    const alertDiv = document.getElementById('alertDiv')
    if (!alertDiv) {
        return false
    }
    const wrapper = document.createElement('div')

    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
        `   <div>${message}</div>`,
        '   <button id="closeButton" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertDiv.append(wrapper)

    const close = document.getElementById('closeButton')
    if (close) {
        close.addEventListener('click', () => {
            alertDiv.removeChild(wrapper)
        })
    }

    setTimeout(() => {
        alertDiv.removeChild(wrapper)
    }, 3000);

    return true
}