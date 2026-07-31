const API_URL =
  "https://script.google.com/macros/s/AKfycbw6LD6FaLvUAdpsCd7jbsKPNRAiyR-H2vzs9dAqpey3JA_hga-zB9Iz1_1hhUgTvWL1KQ/exec";

export async function createPost(
  sender: string,
  dedicatedTo: string,
  content: string
) {
  const formData = new FormData();

  formData.append("sender", sender);
  formData.append("dedicatedTo", dedicatedTo);
  formData.append("content", content);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}