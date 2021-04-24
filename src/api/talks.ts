import { ISpeaker } from "./speakers";

interface ISlot {
  start: string;
  end: string;
  room: { en: string };
}

export interface ITalk {
  code: string;
  abstract: string;
  description: string;
  duration: number;
  title: string;
  submission_type: string;
  slot: ISlot;
  speakers: Array<ISpeaker>
}

interface ITalkResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<ITalk>;
}

/**
 * We are fetching all the talks at once because I couldn't find a way of
 * filtering it using the API.
 */
export async function fetchAllTalks(eventName: string) {
  let talksResponse = await fetchTalks(eventName);
  let talks: Array<ITalk> = [...talksResponse.results];

  while (talksResponse.next) {
    const newTalksResponse = await fetchTalks(eventName, talksResponse.next);
    talks = [...talks, ...newTalksResponse.results];
    talksResponse = newTalksResponse;
  }

  return talks;
}

export async function fetchTalks(
  eventName: string,
  next?: string
): Promise<ITalkResponse> {
  const url = next || `https://pretalx.com/api/events/${eventName}/talks/`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((message) => {
      return message;
    });
}

export async function fetchTalk(
  eventName: string,
  code: string
): Promise<ITalk> {
  const url = `https://pretalx.com/api/events/${eventName}/talks/${code}/`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((message) => {
      return message;
    });
}
