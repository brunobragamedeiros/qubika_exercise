async function registerUser(request, userData) {
  const url = 'https://api.club-administration.qa.qubika.com/';
  const response = await request.post(`${url+'api/auth/register'}`, {
    data: userData,
  });

  const responseBody = await response.json();

  console.log('📥 Register user response:', responseBody);
  
  if (!response.ok()) {
    const errorBody = await response.text();
    throw new Error(
      `User registration failed: ${response.status()} - ${errorBody}`
    );
  }

  return await response.json();
}

module.exports = { registerUser };
