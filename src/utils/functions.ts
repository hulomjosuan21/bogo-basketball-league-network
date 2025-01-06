export const shareToFacebook = (url: string) => {
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(fbShareUrl, '_blank');
};
//  --experimental-https
export function shareToInstagram(url?: string) {
    alert('Instagram sharing is not supported directly.');
}

export function shareToTwitter(url: string) {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
    window.open(url, '_blank');
}