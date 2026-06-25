import React from 'react';
import { BedDouble, Ruler } from 'lucide-react';

const properties = [
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQv0ZKIMiOcYCsK3BjC0TMpypY7Rq8Ihl81hPflpdAhZqqHryf_yLwz5Xh3cGbRD87KiGTqXElTmMOA9_n41hHs_CFUYX-HMvV_dc-VtcZ3pGY6Ltyb03l4jv76Vs8LbYe7o_nqUc26L1g6MBhSj6A-0GORBu0fa2MlbBx-SPegzN06nnAlk8Btcb0FEW6QJSkgLOnM7I2qeldIwNbMrLjnca4DA2O5JfbtmEBpkIctohzkQNONVMDpCrkWN63wWPeAygblYkRLwE',
    name: "L'Aurora Residence",
    price: '$4,250,000 USD',
    size: '850m2',
    bedrooms: '5 Hab.',
    position: 'center top',
  },
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0-m3ckQIoBcQHvL-GPUWDvK1b_2a4J177WqV-bmKBfU70IyABHh9xeiIQGdTVzY0KvyHnS-XGivVhaxNhWta5LllLOnHCFd_yvTiwuX8JxXAKLKlfVV1cHOpe4Wo70NGH74pA6PkKcaUyCwuwyfp3S1IZQerDB7c3rH4dTlc5FdFzAWQJ2MU6D4J-N5jD4f6p6_lQ4ZcGpCOJRLV-WLSTN5GjV4CGpwadn8wT3ufVCdQvMfRFxWL5VVT9snKUDqy3LtF00KCb8HM',
    name: 'Skyline Loft Central',
    price: '$12,000 USD / Mes',
    size: '320m2',
    bedrooms: '3 Hab.',
    position: 'center center',
  },
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCrgDPrZKEX5ZFvTx2c8PcIykJe0rL9ocu1baMHzHL4ow-t_EDf9AxtCsZDywg9ZlPYLhP4ZffPf2aTjMZrvhbQpv_ewjvDMKIVs_dAkgLgCf8yHmPZBYHSxsZ6CPqia6mTVka78ffFnYUQ2LJs_z2VBC168yZFLJ553CeMZQWb5O9ydM6xRujlucT62guntxcf_4_4aT84RmL9ERcYRJNX5N0wm5b4fY-k3BKWhEdP1fX9gyus0c-FRs4wQ6g5NlLpJyBTmXKPRvk',
    name: 'Wildwood Manor',
    price: '$8,900,000 USD',
    size: '1,200m2',
    bedrooms: '7 Hab.',
    position: 'center center',
  },
];

export const PropiedadesExclusivas = (): React.JSX.Element => {
  return (
    <section className="bg-[#121414] px-[3rem] pb-[10rem] pt-[1rem]">
      <div className="mx-auto flex w-full max-w-[136rem] items-center justify-between gap-[3rem]">
        <div>
          <h3 className="mt-[3rem] text-[4rem] font-bold leading-none text-white">
            Propiedades Exclusivas
          </h3>
          <span className="mt-[1.8rem] block h-[0.4rem] w-[9.5rem] bg-[#E9C176]" />
        </div>

        <a
          className="mt-[3rem] border-b border-[#534832] font-sans text-[1.8rem] font-bold uppercase tracking-[0.12em] text-[#E9C176] transition-colors duration-300 hover:border-[#E9C176]"
          href="#"
        >
          Ver Todo El Catalogo
        </a>
      </div>

      <div className="mx-auto mt-[6rem] grid w-full max-w-[136rem] grid-cols-3 gap-[3rem]">
        {properties.map((property) => (
          <article
            className="group relative h-[60rem] overflow-hidden rounded-[2.2rem] border border-white/10 bg-black shadow-[0_2rem_5rem_rgba(0,0,0,0.32)]"
            key={property.name}
          >
            <div
              aria-label={property.name}
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              role="img"
              style={{
                backgroundImage: `url(${property.image})`,
                backgroundPosition: property.position,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/5 to-black/75" />
            <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-black via-black/85 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 px-[3.2rem] pb-[3.2rem]">
              <p className="font-sans text-[2.8rem] font-black leading-none text-[#E9C176]">
                {property.price}
              </p>

              <h4 className="mt-[1.4rem] text-[1.8rem] font-bold text-white">
                {property.name}
              </h4>

              <span className="mt-[2.2rem] block h-px w-full bg-white/10" />

              <div className="mt-[2.8rem] flex items-center gap-[2.4rem] font-sans text-[1.6rem] font-bold text-white/75">
                <span className="flex items-center gap-[0.8rem]">
                  <Ruler className="h-[1.9rem] w-[1.9rem] text-[#E9C176]" />
                  {property.size}
                </span>

                <span className="flex items-center gap-[0.8rem]">
                  <BedDouble className="h-[1.9rem] w-[1.9rem] text-[#E9C176]" />
                  {property.bedrooms}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
