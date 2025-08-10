import { BsDot } from "react-icons/bs"
import { MdExplicit } from "react-icons/md"

const SongInfo = ({ data }) => {

  return (
    <>
      {
        data?.type == 'artist' &&
        <>
          <BsDot size={20} />
          <span>
            {/* Saavn API has 'followerCount' for artists */}
            {
              data?.followerCount / 1000000 > 1 ? `${(data?.followerCount / 1000000).toFixed(1)}M ` :
                data?.followerCount / 1000 > 1 ? `${(data?.followerCount / 1000).toFixed(1)}K ` :
                  ` ${data?.followerCount} `
            } fans
          </span>
        </>
      }
      {
        (data?.type != 'artist') &&
        // Saavn API uses 'explicitContent' (1 or 0)
        data?.explicitContent === 1 && <span className="flex flex-row items-center justify-center"><MdExplicit size={20} /></span>
      }
    </>
  )
}

export default SongInfo