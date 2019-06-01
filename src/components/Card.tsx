import React from "react";
import "./CardView.scss";

type Props = {
  card: ICard;
  className?: string;
};

type ICard = {
  name: string;
  imageUrlHiRes: string;
};

export const Card = ({ card }: Props) => {
  return (
    <div className="card--container">
      <h1 className="card--title">{card.name}</h1>
      <img
        className="card--image"
        src={card.imageUrlHiRes}
        alt="Pokemon card"
      />
      <CardDetails className="card--details" card={card} />
    </div>
  );
};

const CardDetails = ({ card }: Props) => {
  return <p>{card.name}</p>;
};

// export const Card = ({ card }) => {
//   return (
//     <div className="card">
//       <div className="columns">
//         <div className="column is-one-third">
//           <img className="card-img" src={card.imageUrlHiRes} alt={card.name} />
//         </div>
//         <div className="column is-6 is-offset-1">
//           <div className="content card-details">
//             <nav className="card-details_head level">
//               <div className="level-left">
//                 <div className="level-item">
//                   <span className="title is-3">{card.name}</span>
//                 </div>
//                 <div className="level-item">
//                   <span className="title is-4 has-text-muted">
//                     {card.supertype} - {card.subtype}
//                   </span>
//                 </div>
//               </div>
//               <div className="level-right">
//                 <div className="level-item">
//                   <span className="title is-5">
//                     {card.hp}{" "}
//                     <span>
//                       <i className="energy grass" />
//                     </span>
//                   </span>
//                 </div>
//               </div>
//             </nav>
//             <hr />
//             <div>
//               {card.attacks.map(attack => (
//                 <div className="card-details_attack">
//                   <span className="title is-4">
//                     <span>
//                       {attack.cost.map(cost => {
//                         return <i className={cost} />;
//                       })}
//                     </span>
//                     {attack.name}
//                   </span>
//                   <span>
//                     <span className="title is-3 has-text-muted">
//                       &nbsp;|&nbsp;
//                     </span>
//                     <span className="title is-4">{attack.damage}</span>
//                   </span>
//                   <p>{attack.text}</p>
//                 </div>
//               ))}
//             </div>
//             <nav className="level card-details_weakness-resistance-retreat">
//               <div className="level-item has-text-centered">
//                 <div className="card-details_weakness">
//                   <p className="heading">weakness</p>
//                   <p className="title is-5">
//                     {card.weaknesses.map(weak => (
//                       <span>
//                         <span>{weak.type}</span> {weak.value}
//                       </span>
//                     ))}
//                   </p>
//                 </div>
//               </div>
//               {card.resistances ? (
//                 <div className="level-item has-text-centered">
//                   <div className="card-details_weakness">
//                     <p className="heading">resistances</p>
//                     <p className="title is-5">
//                       {card.resistances.map(resistance => (
//                         <span>
//                           <span>{resistance.type}</span> {resistance.value}
//                         </span>
//                       ))}
//                     </p>
//                   </div>
//                 </div>
//               ) : null}
//               <div className="level-item has-text-centered">
//                 <div className="card-details_weakness">
//                   <p className="heading">retreat cost</p>
//                   <p className="title is-5">
//                     <span>{card.retreatCost.join(", ")}</span>
//                   </p>
//                 </div>
//               </div>
//             </nav>
//             <nav className="level">
//               <div className="level-item has-text-centered">
//                 <div className="card-details_artist">
//                   <p className="heading">set</p>
//                   <p className="title is-5">{card.set} </p>
//                 </div>
//               </div>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
