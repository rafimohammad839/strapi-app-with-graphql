import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

const CATEGORY_QUERY = gql`
query GetCategory ($id: ID!) {
  category (id: $id) {
    data {
      id,
      attributes {
        name,
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
    }
  }
}
`

export default function Category() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(CATEGORY_QUERY, {
    variables: { id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error 😞</p>

  console.log(data);

  return (
    <div>
      <h2>{data.category.data.attributes.name}</h2>
      {data?.category?.data?.attributes?.reviews?.data?.map(review => (
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
