const validate = () => {
  const form = document.querySelector('.recipient__form')
  const submitBtn = document.querySelector('.order-btn')
  const touchedFields = new Set()

  const validateName = (value) => {
    return value.trim() !== ''
  }

  const validateSurname = (value) => {
    return value.trim() !== ''
  }

  const validateEmailEmpty = (value) => {
    return value.trim() !== ''
  }
  const validateEmail = (value) => {
    if (!validateEmailEmpty(value)) {
      return false
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(value)
  }

  const validatePhoneEmpty = (value) => {
    return value.trim() !== ''
  }
  const validatePhone = (value) => {
    if (!validatePhoneEmpty(value)) {
      return false
    }

    const regex = /^[+\d\s]{1,30}$/
    return regex.test(value) && !/[a-zA-Z]/.test(value)
  }

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '') // Удаляем все нецифровые символы
      .replace(/(\d{1,4})/g, '$1 ') // Добавляем пробел после каждых 4 цифр
      .trim() // Удаляем пробел в конце строки, если он есть
      .slice(0, 30) // Обрезаем строку до 30 символов
  }

  const validateInn = (value) => {
    return value.trim().length === 14 && /^\d+$/.test(value)
  }

  const validateField = (input, validator) => {
    const value = input.value
    const valid = validator(value)
    const errorMessages = input.parentElement.querySelectorAll('.validate-message')
    errorMessages.forEach((msg) => {
      msg.classList.add('validate-hidden') // Скрываем все сообщения
    })
    if (!valid && touchedFields.has(input)) {
      const errorMessage = findErrorMessage(input, validator, value)
      if (errorMessage) {
        errorMessage.classList.remove('validate-hidden') // Показываем нужное сообщение
      }
    }
    return valid
  }

  const validateForm = () => {
    console.log('Validating form')

    let valid = true
    const nameInput = document.querySelector('.validate-name')
    valid = valid && validateField(nameInput, validateName)
    const surnameInput = document.querySelector('.validate-surname')
    valid = valid && validateField(surnameInput, validateSurname)
    const emailInput = document.querySelector('.validate-email')
    valid = valid && validateField(emailInput, validateEmail)
    const phoneInput = document.querySelector('.validate-phone')
    valid = valid && validateField(phoneInput, validatePhone)
    const innInput = document.querySelector('.validate-inn')
    valid = valid && validateField(innInput, validateInn)
    return valid
  }

  const findErrorMessage = (input, validator, value) => {
    const parent = input.parentElement
    if (validator === validateEmail) {
      return value.trim() === '' ? parent.querySelector('.validate-error-email') : parent.querySelector('.validate-error-email-format')
    }
    if (validator === validatePhone) {
      return value.trim() === '' ? parent.querySelector('.validate-error-phone') : parent.querySelector('.validate-error-phone-format')
    }
    return parent.querySelector('.validate-error-' + validator.name.replace('validate', '').toLowerCase())
  }
  form.addEventListener('input', function (event) {
    const input = event.target
    if (input.classList.contains('validate-name')) {
      validateField(input, validateName)
    } else if (input.classList.contains('validate-surname')) {
      validateField(input, validateSurname)
    } else if (input.classList.contains('validate-email')) {
      validateField(input, validateEmail)
    } else if (input.classList.contains('validate-phone')) {
      input.value = formatPhone(input.value) // Форматируем номер перед валидацией
      validateField(input, validatePhone)
    } else if (input.classList.contains('validate-inn')) {
      validateField(input, validateInn)
    }
  })

  form.addEventListener(
    'blur',
    function (event) {
      const input = event.target
      touchedFields.add(input) // Поле было затронуто
      validateField(input, findValidator(input)) // Валидируем поле
    },
    true
  )

  const findValidator = (input) => {
    if (input.classList.contains('validate-name')) {
      return validateName
    } else if (input.classList.contains('validate-surname')) {
      return validateSurname
    } else if (input.classList.contains('validate-email')) {
      return validateEmail
    } else if (input.classList.contains('validate-phone')) {
      return validatePhone
    } else if (input.classList.contains('validate-inn')) {
      return validateInn
    }
  }

  submitBtn.addEventListener('click', function (event) {
    console.log('Button clicked')

    // Добавляем все поля формы в множество 'touchedFields'
    const inputs = form.querySelectorAll('input')
    inputs.forEach((input) => {
      touchedFields.add(input)
      validateField(input, findValidator(input)) // Валидируем поле
    })

    console.log(validateForm())
    if (!validateForm()) {
      event.preventDefault()
    }
  })
}

export default validate
