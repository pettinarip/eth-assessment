export interface IEvent {
  date_from: string;
  date_to: string;
  is_public: boolean;
  name: { de: string };
  slug: string;
  timezone: string;
}

export async function fetchEvent(event: string): Promise<IEvent> {
  return fetch(`https://pretalx.com/api/events/${event}/`)
    .then((response) => {
      return response.json();
    })
    .then((message) => {
      return message;
    });
}