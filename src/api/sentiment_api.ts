import {URL} from 'react-native-url-polyfill';
import {encode} from 'base-64'
import {API_KEY, DJANGO_USERNAME, DJANGO_PASSWORD} from "@env";
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat)
const categories = new Map([
    [1, 'Film & Animation'],
    [2, 'Autos & Vehicles'],
    [10, 'Music'],
    [15, 'Pets & Animals'],
    [17, 'Sports'],
    [18, 'Short Movies'],
    [19, 'Travel & Events'],
    [20, 'Gaming'],
    [21, 'Video Blogging'],
    [22, 'People & Blogs'],
    [23, 'Comedy'],
    [24, 'Entertainment'],
    [25, 'News & Politics'],
    [26, 'Howto & Style'],
    [27, 'Education'],
    [28, 'Science & Technology'],
    [29, 'Nonprofits & Activism'],
    [30, 'Movies'],
    [31, 'Anime / Animation'],
    [32, 'Action / Adventure'],
    [33, 'Classics'],
    [34, 'Comedy'],
    [35, 'Documentary'],
    [36, 'Drama'],
    [37, 'Family'],
    [38, 'Foreign'],
    [39, 'Horror'],
    [40, 'Sci - Fi / Fantasy'],
    [41, 'Thriller'],
    [42, 'Shorts'],
    [43, 'Shows'],
    [44, 'Trailers'],
]);

function getVideoId(text: string) {
    let regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    let match = text.match(regExp);
    if (match) {
        return match[1];
    } else {
        throw Error('Video ID not found')
    }
}

async function getCommentCount(video_id: string) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video_id}&key=${API_KEY}`)
    const data = await response.json()
    return parseInt(data.items[0].statistics.commentCount)
}

async function getVideoDetails(video_id: string) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${video_id}&key=${API_KEY}`)
    const data = await response.json()
    const title: string = data.items[0].snippet.title
    const date: string = dayjs(data.items[0].snippet.publishedAt).format('LL')
    const category: string = <string>categories.get(parseInt(data.items[0].snippet.categoryId))
    const thumbnailUrl: string = data.items[0].snippet.thumbnails.standard.url
    return {title, date, category, thumbnailUrl: thumbnailUrl}
}

async function getSentiment(video_id: string) {
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

export {getVideoId, getSentiment, getCommentCount, getVideoDetails};