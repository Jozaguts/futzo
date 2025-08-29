export const sendVerificationCode = async (value: string, areaCode: string, type: 'email' | 'phone') => {
  const client = useSanctumClient();
  value = type === 'phone' ? areaCode + value : value;
  return await client(`/verification-code/send`, {
    method: 'POST',
    body: { [type]: value },
  });
};
