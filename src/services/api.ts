const API_URL =
  "https://script.google.com/macros/s/AKfycbyjx-43wqUNO_EN3QIo2NiC88Qw1UJiliNgXJo8YmR3c7dYJSNK-sgS_P8NKifGCI20cA/exec";

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