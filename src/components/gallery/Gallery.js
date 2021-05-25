import Item from './Item'

const Gallery = ({items}) => {
    return (
        <div className="gallery">
          {items.map((item, index) => (
              <Item key={index} item={item} />
          ))
        } 
        </div>
    )
}

export default Gallery
