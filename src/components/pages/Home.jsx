import styled from "styled-components";

const StyledSection = styled.section`
  text-align: justify;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    max-width: 950px;
  }

  > h1, h3 {
    text-align: center;
  }

  > img {
    display: block;
    margin: 0 auto;
    width: fit-content;
    border-radius: 10px;
    aspect-ratio: 2.5 / 1;
    object-fit: cover;
  }

  > p {
    margin-top: 0;
  }

  > p::first-letter {
    font-size: 20px;
    padding-left: 20px;
  }
`

const Home = () => {
  return (
    <StyledSection>
      <h1>Welcome to Stride Buddies Forum!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum iusto ratione dolor quisquam eius similique velit, quaerat fuga ex alias rerum labore distinctio quos neque et laboriosam, doloribus nostrum tempora.
      </p>
      <p>
        Fuga dignissimos doloribus facilis deserunt illum aliquid odio sequi porro magni, esse, voluptatem animi placeat amet quam, ullam sit ad soluta libero nesciunt. Adipisci, voluptates eum, quasi reiciendis eius est esse quae dolores et, eveniet exercitationem accusantium consectetur facere illum minus. Nihil, fugiat reiciendis!
      </p>
      <img 
        src="https://npr.brightspotcdn.com/dims4/default/c920939/2147483647/strip/true/crop/1170x796+0+0/resize/880x599!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Feb%2Fbf%2F055b5e0f42dfaec2f20a79a9e061%2Fimg-4004.jpg"
        alt="Stride Buddies Community"
        />
      <h3>Don't panic! Just ask away!</h3>
      <p>
        Consectetur adipisicing elit. Porro numquam eos asperiores minima, nisi unde. Aperiam repudiandae nesciunt dicta voluptate delectus iusto alias, voluptas perspiciatis esse quasi dolore eaque animi. Minus animi quaerat dolores, explicabo illo reiciendis natus asperiores! Id, repellat, laborum maiores rerum eos odit quidem facere deserunt nihil explicabo quas quibusdam magni dignissimos quo necessitatibus! Cupiditate velit mollitia facere. Reprehenderit odit blanditiis deserunt autem nihil. Quia accusantium libero reiciendis dicta velit ratione quam, ipsum temporibus obcaecati enim adipisci magni ipsa illo ipsam explicabo excepturi voluptatem recusandae autem distinctio alias perferendis aliquid, inventore sunt? Ad minima quibusdam ratione eveniet?
      </p>
      <p>
        Quam dolore, vero, earum perferendis nostrum ex corrupti ut consectetur beatae natus porro perspiciatis voluptates, odit maxime accusantium excepturi saepe amet est modi totam? Alias, facere ipsa!
      </p>
      <img 
        src="https://images.parkrun.com/blogs.dir/1056/files/2019/01/39333479300_f34bbf21b2_k.jpg"
        alt="Stride Buddies Community"
      />
    </StyledSection>
  );
}
 
export default Home;