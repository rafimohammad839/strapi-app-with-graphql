import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';


const REVIEWS_QUERY = gql`
  query GetReviews {
    reviews {
      data {
        id,
        attributes {
          title,
          rating,
          body,
          categories {
            data {
              id,
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`

export default function Homepage() {

  const { data, loading, error } = useQuery(REVIEWS_QUERY);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error 😞</p>

  return (
    <div>
      {data?.reviews?.data?.map(review => (
        <div key={review.id} className='review-card'>
          <div className="rating">{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>

          {review.attributes.categories.data.map(category => (
            <small key={category.id}>{category.attributes.name}</small>
          ))}

          <ReactMarkdown>{review.attributes.body.substring(0, 200) + "..."}</ReactMarkdown>

          <Link to={`/details/${review.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  )
}
