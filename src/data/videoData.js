import communityEventVideo from '../assets/videos/web/IMG_3050.mp4'
import publicAddressVideo from '../assets/videos/web/IMG_3140.mp4'
import fieldVisitVideo from '../assets/videos/web/VID-20260826-WA0002.mp4'
import communityEventPoster from '../assets/videos/posters/IMG_3050.jpg'
import publicAddressPoster from '../assets/videos/posters/IMG_3140.jpg'
import fieldVisitPoster from '../assets/videos/posters/VID-20260826-WA0002.jpg'

export const videoItems = [
  {
    id: 'IMG_3050',
    platform: 'local',
    source: communityEventVideo,
    poster: communityEventPoster,
    duration: '1:38',
    title: { hi: 'सामुदायिक समारोह और जनसंपर्क', en: 'Community Gathering and Public Outreach' },
    description: { hi: 'समारोह में संबोधन, सहभागियों से संवाद और सम्मान के दृश्य।', en: 'Scenes from the gathering, including an address, participant interaction and felicitation.' },
  },
  {
    id: 'IMG_3140',
    platform: 'local',
    source: publicAddressVideo,
    poster: publicAddressPoster,
    duration: '0:09',
    title: { hi: 'जनसभा को संबोधन', en: 'Address to the Public Gathering' },
    description: { hi: 'सामुदायिक सभा में दिए गए संबोधन का संक्षिप्त वीडियो।', en: 'A short video from an address delivered at a community gathering.' },
  },
  {
    id: 'VID-20260826-WA0002',
    platform: 'local',
    source: fieldVisitVideo,
    poster: fieldVisitPoster,
    duration: '0:03',
    title: { hi: 'मैदानी भ्रमण', en: 'Field Visit' },
    description: { hi: 'स्थानीय साथियों के साथ मैदानी भ्रमण की संक्षिप्त झलक।', en: 'A brief glimpse of a field visit with local community members.' },
  },
]
