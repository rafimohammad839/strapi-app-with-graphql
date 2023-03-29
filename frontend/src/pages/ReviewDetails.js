import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

const REVIEW_QUERY = gql`
  query GetReview ($id: ID!) {
    review (id: $id) {
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

export default function ReviewDetails() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(REVIEW_QUERY, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error 😞</p>

  return (
    <div>
      {data && (
        <div key={data.review.data.id} className='review-card'>
          <div className="rating">{data.review.data.attributes.rating}</div>
          <h2>{data.review.data.attributes.title}</h2>  

          {data.review.data.attributes.categories.data.map(category => (
            <small key={category.id}>{category.attributes.name}</small>
          ))}


          <ReactMarkdown>{data.review.data.attributes.body}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}
