/*************************************************************
 *  CATÁLOGO DA SERRA – dados de produto
 *************************************************************/
const products = [
    {
      id: 'carvao',
      nome: 'Carvão da Serra',
      preco: 12,
      categoria: 'Churrasco',
      resumo: '5 kg de carvão vegetal 100 % giesta; brasas rápidas e aroma suave.',
      imagens: [
        'images/carvao_main.png',
        'images/carvao_detail1.png',
        'images/carvao_detail2.png'
      ],
      descricaoLonga: `
        <p class="mb-4">Carvão premium proveniente da limpeza da Serra da Aboboreira,
        convertendo biomassa em energia limpa para o seu churrasco.</p>
        <ul class="list-disc list-inside space-y-1">
          <li>Tempo de acendimento: &lt; 10 min</li>
          <li>Temperatura média da brasa: 750 °C</li>
          <li>Limpa 100 m² de floresta por saco</li>
        </ul>`,
      specs: [
        'Peso líquido : 5 kg',
        'Origem : giesta (Cytisus scoparius)',
        'Embalagem : saco kraft reciclável',
        'Norma : EN 1860-2'
      ],
      faq: [
        { q:'Produz muito fumo?', a:'Não; o carvão de giesta liberta pouco fumo e odor.' },
        { q:'Serve em grelhadores a gás?', a:'Sim, desde que o equipamento aceite carvão.' }
      ],
      comments: [
        { user:'João R.',   txt:'Brasa super-rápida, carne saborosa. Recomendo!' },
        { user:'Chef Marta',txt:'Adoro a história por trás — e o desempenho na grelha.' }
      ]
    },
  
    {
      id: 'estilha',
      nome: 'Estilha da Serra',
      preco: 6,
      categoria: 'Jardinagem',
      resumo: 'Cobertura orgânica 50 L que retém humidade e suprime ervas daninhas.',
      imagens: [
        'images/estilha_main.png',
        'images/estilha_detail1.png',
        'images/estilha_detail2.png'
      ],
      descricaoLonga: `
        <p class="mb-4">Mulch natural proveniente da fragmentação de giesta –
        ideal para hortas, canteiros e trilhos de jardim.</p>`,
      specs: [
        'Volume : 50 L (≈ 4 kg)',
        'Granulometria : 0,5–4 cm',
        'Matéria seca : &gt; 90 %',
        'pH : 6,0–6,5'
      ],
      faq: [
        { q:'Atrai insetos?', a:'Não; a giesta seca tende a repelir pragas comuns.' },
        { q:'Quando devo repor?', a:'Aplique 5 cm de espessura e renove anualmente.' }
      ],
      comments: [
        { user:'Ana T.', txt:'O jardim ficou bonito e preciso regar menos.' }
      ]
    },
  
    {
      id: 'vinagre',
      nome: 'Vinagre da Serra',
      preco: 9,
      categoria: 'Agricultura',
      resumo: 'Ácido pirolenhoso 500 ml para fertilização, controlo de pragas e estímulo de sementes.',
      imagens: [
        'images/vinagre_main.png',
        'images/vinagre_detail1.png'
      ],
      descricaoLonga: `
        <p class="mb-4">Subproduto da condensação de fumo durante a carbonização;
        rico em compostos fenólicos, é aliado versátil na horta.</p>`,
      specs: [
        'Volume : 500 ml',
        'pH : ~3,0',
        'Sem aditivos',
        'Diluição : 1:100 a 1:500'
      ],
      faq: [
        { q:'Posso usar em plantas ornamentais?',
          a:'Sim, desde que respeite a diluição recomendada.' },
        { q:'Substitui fertilizante NPK?',
          a:'Funciona como complemento, não como substituto total.' }
      ],
      comments: [
        { user:'Pedro C.', txt:'Reduzi fungos no tomateiro usando 1:200. Excelente!' }
      ]
    }
  ];
  
  /*************************************************************
   *  UTILITÁRIOS
   *************************************************************/
  const formatEUR = n => n.toLocaleString('pt-PT',
    { style:'currency', currency:'EUR' });
  
  /*************************************************************
   *  1) CATÁLOGO NA HOME
   *************************************************************/
  function buildProductCarousel(){
    const track=document.getElementById('prodTrack');
    if(!track) return;
    products.forEach(p=>{
      const card=document.createElement('div');
      card.className='min-w-[220px] sm:min-w-[250px] shrink-0 mx-2 bg-white rounded-xl shadow hover:shadow-lg transition';;
      card.innerHTML=`
        <img src="${p.imagens[0]}" alt="${p.nome}" class="h-48 w-full object-contain p-4">
        <div class="px-4 pb-6">
          <h3 class="font-semibold text-lg mb-1">${p.nome}</h3>
          <p class="text-sm mb-3 text-gray-600">${p.resumo}</p>
          <p class="font-bold text-emerald-700 mb-4">${formatEUR(p.preco)}</p>
          <a href="produto.html?id=${p.id}"
             class="inline-block px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700">
            Ver detalhes
          </a>
        </div>`;
      track.appendChild(card);
    });
  }
  document.addEventListener('DOMContentLoaded', buildProductCarousel);
  
  /*************************************************************
   *  2) PÁGINA DE DETALHE
   *************************************************************/
  function injectProductDetail(id){
    const prod=products.find(p=>p.id===id)||products[0];
    const wrap=document.getElementById('productPage');
    if(!wrap) return;
  
    /* Thumbs */
    const thumbs=prod.imagens.map((src,i)=>`
      <img src="${src}" data-idx="${i}"
           class="h-16 w-16 object-contain p-1 border cursor-pointer rounded
                  hover:ring-2 hover:ring-emerald-600">`).join('');
  
    /* FAQ */
    const faqHtml=prod.faq.map(f=>`
      <details class="border rounded-lg p-4 group">
        <summary class="font-medium cursor-pointer flex justify-between items-center group-open:text-emerald-600">
          ${f.q}<span class="group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <p class="mt-2 text-gray-700">${f.a}</p>
      </details>`).join('');
  
    /* Comments */
    const comHtml=prod.comments.map(c=>`
      <div class="border-b py-3">
        <p class="font-semibold">${c.user}</p>
        <p class="text-gray-700 text-sm">${c.txt}</p>
      </div>`).join('');
  
    /* Template */
    wrap.innerHTML=`
      <a href="index.html" class="text-emerald-600 hover:underline">← Voltar</a>
  
      <div class="mt-6 flex flex-col md:flex-row gap-10">
        <div class="flex-1">
          <img id="mainImg" src="${prod.imagens[0]}" alt="${prod.nome}"
               class="w-full max-w-lg object-contain mx-auto">
          <div id="thumbRow" class="flex gap-2 mt-4 justify-center">${thumbs}</div>
        </div>
  
        <div class="flex-1">
          <h1 class="text-3xl font-bold burnt mb-2">${prod.nome}</h1>
          <p class="text-gray-600 mb-4">${prod.resumo}</p>
          <p class="text-2xl font-bold text-emerald-700 mb-6" id="price">${formatEUR(prod.preco)}</p>
  
          <div class="mb-6">
            <label for="qty" class="mr-2 font-medium">Quantidade:</label>
            <input id="qty" type="number" min="1" value="1"
                   class="w-20 border rounded p-1 text-center">
          </div>
  
          <button id="btnOrder"
            class="px-8 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700">
            Encomendar (<span id="totalVal">${formatEUR(prod.preco)}</span>)
          </button>
  
          <div class="mt-10">
            <h2 class="text-xl font-semibold burnt mb-2">Descrição</h2>
            ${prod.descricaoLonga}
  
            <h2 class="text-xl font-semibold burnt mt-6 mb-2">Especificações</h2>
            <ul class="list-disc list-inside space-y-1">
              ${prod.specs.map(s=>`<li>${s}</li>`).join('')}
            </ul>
  
            <h2 class="text-xl font-semibold burnt mt-6 mb-2">FAQ</h2>
            <div class="space-y-3">${faqHtml}</div>
  
            <h2 class="text-xl font-semibold burnt mt-6 mb-2">Comentários</h2>
            <div class="space-y-2">${comHtml}</div>
          </div>
        </div>
      </div>`;
  
    /* Interações */
    document.querySelectorAll('#thumbRow img').forEach(img=>{
      img.addEventListener('click',()=>document.getElementById('mainImg').src=img.src);
    });
  
    const qty   = document.getElementById('qty');
    const total = document.getElementById('totalVal');
    qty.addEventListener('input',()=>{
      const n=Math.max(1,parseInt(qty.value)||1);
      qty.value=n;
      total.textContent=formatEUR(n*prod.preco);
    });
  
    document.getElementById('btnOrder')
      .addEventListener('click',()=>{
        const q=qty.value;
        const msg=encodeURIComponent(`Olá! Gostaria de encomendar ${q} × ${prod.nome} (${formatEUR(q*prod.preco)}).`);
        window.open(`https://wa.me/351910000000?text=${msg}`,'_blank');
      });
  }
  
  /* Exporta para produto.html */
  if(typeof window!=='undefined') window.injectProductDetail=injectProductDetail;
  