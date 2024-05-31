import api from "../../../api";

const useRating = async (id, trackName, artistName, image, rating) => {
    const username = localStorage.getItem('nickname');

    console.log(artistName)
    try {
        const requestAllMusic = await api.get("api/music/")
        console.log("request", requestAllMusic)
        const check = requestAllMusic.data.some(element => {
            return element.spotify_id == id;
        })
        console.log(check,"rating: ", rating);
        if (!check) {
            const req = await api.post("api/music/", {
                "song_title": trackName,
                "artist_name": artistName.join(", "),
                "image": image,
                "spotify_id": id,
                "sum_of_votes": rating,
            })
            let userId = await api.get('api/find-users-by-nickname/?username=' + username);
            userId = userId.data[0].id;
            const trackId = req.data.id;
            console.log(userId, trackId);
            await api.post("api/add-track-rating/", {
                "user": userId,
                "track": trackId,
                "rating": rating,
            })
        } else {
            const req = await api.get("api/music-by-id/?spotify_id=" + id);
            const musicId = req.data[0].id;
            let userId = await api.get('api/find-users-by-nickname/?username=' + username);
            userId = userId.data[0].id;
            let trackRatingId = await api.get(`api/find-rating-by-user-song/?user=${username}&track=${musicId}`);
            trackRatingId = trackRatingId.data[0].id;
            await api.patch(`api/change-track-rating/${trackRatingId}/`, {
                "rating": rating,
            })
        }
    } catch(error) {
        console.log(error);
    }
}

export default useRating;