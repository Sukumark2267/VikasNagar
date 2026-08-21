export async function submitRegistration(formData) {
  const endpoint = import.meta.env.VITE_GOOGLE_SCRIPT_URL

  if (!endpoint) {
    const error = new Error('REGISTRATION_NOT_CONFIGURED')
    error.code = 'NOT_CONFIGURED'
    throw error
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    redirect: 'follow',
    body: JSON.stringify({
      ...formData,
      submittedAt: new Date().toISOString(),
      sourceUrl: window.location.href,
    }),
  })

  if (!response.ok) throw new Error(`Registration request failed (${response.status})`)

  const responseText = await response.text()
  let result
  try {
    result = JSON.parse(responseText)
  } catch {
    throw new Error('Registration service returned an invalid response')
  }

  if (!result.ok) throw new Error(result.error || 'Registration request failed')
  return result
}
