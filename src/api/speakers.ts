export interface ISpeaker {
  code: string;
  name: string;
  biography: string;
}

export async function fetchSpeaker(
  eventName: string,
  code: string
): Promise<ISpeaker> {
  return fetch(`https://pretalx.com/api/events/${eventName}/speakers/${code}/`)
    .then((response) => {
      return response.json();
    })
    .then((message) => {
      return message;
    });
}
