import {URL} from 'react-native-url-polyfill';
import {encode} from 'base-64'
import {API_KEY, DJANGO_USERNAME, DJANGO_PASSWORD} from "@env";

function get_video_id(text: string) {
    const params = new URL(text).searchParams;
    const video_id = params.get('v')
    if (!video_id) {
        throw Error
    }
    return video_id
}

async function get_comment_count(video_id: string) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video_id}&key=${API_KEY}`)
    const data = await response.json()
    return parseInt(data.items[0].statistics.commentCount)
}

async function get_sentiment(video_id: string) {
    const response = await fetch(`http://127.0.0.1:8000/?video_id=${video_id}`, {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + encode(`${DJANGO_USERNAME}:${DJANGO_PASSWORD}`),
            }
        }
    )
    const data = await response.json()
    return [data.Negative, data.Neutral, data.Positive].map((num) => parseInt(num))
}

export {get_video_id, get_sentiment, get_comment_count};