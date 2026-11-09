import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { office } from "@/lib/data";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Harmandaoğlu A.Ş kişisel verilerin korunması aydınlatma metni: hangi verilerin, hangi amaçla ve hangi hukuki sebeple işlendiği ile KVKK kapsamındaki haklarınız.",
  alternates: { canonical: "/kvkk" },
};

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Veri sorumlusu",
    body: (
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca veri
        sorumlusu, Antalya’da faaliyet gösteren {office.name}’dir (“Şirket”).
        Bize {office.email} adresinden veya {office.phoneDisplay} numaralı
        telefondan ulaşabilirsiniz.
      </p>
    ),
  },
  {
    title: "İşlenen kişisel veriler",
    body: (
      <>
        <p>
          <span className="text-ivory">Bizimle iletişime geçtiğinizde:</span>{" "}
          ad soyad, telefon numarası, e-posta adresi ve tarafınızca paylaşılan
          proje bilgileri (mülk tipi, konum, tahmini alan, kapsam, takvim,
          yatırım aralığı ve notlar).
        </p>
        <p>
          <span className="text-ivory">Siteyi ziyaret ettiğinizde:</span>{" "}
          barındırma sunucusunun güvenlik amacıyla tuttuğu standart erişim
          kayıtları (IP adresi, tarayıcı bilgisi, ziyaret zamanı).
        </p>
        <p>
          Özel brifing alanına girdiğiniz bilgiler sunucularımıza gönderilmez ve
          sitede saklanmaz. Bu bilgiler yalnızca “WhatsApp ile ilet” seçeneğine
          dokunduğunuzda, kendi WhatsApp uygulamanızda hazır bir mesaj olarak
          açılır; mesajı göndermek ya da düzenlemek sizin tercihinizdedir.
        </p>
        <p>
          Sitemiz reklam veya takip çerezi kullanmaz. Açılış animasyonunun aynı
          oturumda tekrar uzun gösterilmemesi için tarayıcınızın oturum
          belleğinde kişisel veri içermeyen bir işaret tutulur.
        </p>
      </>
    ),
  },
  {
    title: "İşleme amaçları",
    body: (
      <p>
        Talebinize dönüş yapılması, keşif ve teklif süreçlerinin yürütülmesi,
        sözleşmenin kurulması ve ifası, proje planlaması, yasal
        yükümlülüklerin yerine getirilmesi ile sitenin güvenliğinin
        sağlanması.
      </p>
    ),
  },
  {
    title: "Hukuki sebepler",
    body: (
      <p>
        Kişisel verileriniz KVKK’nın 5. maddesinin 2. fıkrasında yer alan; bir
        sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (c),
        Şirketin hukuki yükümlülüğünü yerine getirebilmesi (ç) ve temel hak ve
        özgürlüklerinize zarar vermemek kaydıyla Şirketin meşru menfaati (f)
        hukuki sebeplerine dayanılarak işlenir.
      </p>
    ),
  },
  {
    title: "Aktarım",
    body: (
      <>
        <p>
          Kişisel verileriniz; yalnızca projenizin gerektirdiği ölçüde iş
          ortaklarımızla (mimar, mühendis, tedarikçi), yasal zorunluluk
          hâlinde yetkili kamu kurum ve kuruluşlarıyla ve sitenin barındırma
          hizmet sağlayıcısıyla paylaşılabilir.
        </p>
        <p>
          WhatsApp üzerinden kurulan iletişim, tarafınızca başlatılır ve
          WhatsApp altyapısı üzerinden iletilir. Bu kanalı tercih etmezseniz
          bize telefon veya e-posta ile ulaşabilirsiniz.
        </p>
      </>
    ),
  },
  {
    title: "Saklama süresi",
    body: (
      <p>
        Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili
        mevzuatta öngörülen saklama süreleri boyunca muhafaza edilir; bu
        sürelerin sonunda silinir, yok edilir veya anonim hâle getirilir.
      </p>
    ),
  },
  {
    title: "Haklarınız",
    body: (
      <>
        <p>KVKK’nın 11. maddesi uyarınca Şirkete başvurarak;</p>
        <ul className="list-none space-y-2 border-l border-[rgba(227,218,201,0.14)] pl-4">
          {[
            "kişisel verilerinizin işlenip işlenmediğini öğrenme,",
            "işlenmişse buna ilişkin bilgi talep etme,",
            "işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
            "yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,",
            "eksik veya yanlış işlenmişse düzeltilmesini isteme,",
            "KVKK’nın 7. maddesi çerçevesinde silinmesini veya yok edilmesini isteme,",
            "düzeltme, silme ve yok etme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme,",
            "münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç doğmasına itiraz etme,",
            "kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>haklarına sahipsiniz.</p>
      </>
    ),
  },
  {
    title: "Başvuru",
    body: (
      <p>
        Taleplerinizi{" "}
        <a href={office.emailHref} className="text-champagne underline-offset-4 hover:underline">
          {office.email}
        </a>{" "}
        adresine, kimliğinizi doğrulayacak bilgilerle birlikte iletebilirsiniz.
        Başvurularınız, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında
        Tebliğ uyarınca en geç otuz gün içinde ücretsiz olarak sonuçlandırılır.
      </p>
    ),
  },
];

export default function KvkkPage() {
  return (
    <main className="relative">
      <article className="section-frame">
        <div className="mx-auto max-w-2xl pt-[calc(2.5rem+env(safe-area-inset-top))] md:pt-12">
          <p className="meta mb-3 text-champagne md:mb-4">Hukuki · KVKK</p>
          <h1 className="headline text-[clamp(1.9rem,7vw,3.4rem)] leading-[1.1] text-ivory">
            Kişisel verilerin korunması aydınlatma metni.
          </h1>
          <p className="meta mt-5 text-muted">Son güncelleme · Kasım 2026</p>

          <div className="mt-12 space-y-10 md:mt-16">
            {sections.map((section, i) => (
              <section
                key={section.title}
                className="border-t border-[rgba(227,218,201,0.12)] pt-6"
              >
                <h2 className="flex items-baseline gap-4 font-serif text-[1.45rem] leading-tight tracking-[-0.02em] text-ivory md:text-[1.7rem]">
                  <span className="meta shrink-0 text-champagne/70">0{i + 1}</span>
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-[1.75] text-muted md:text-[16px]">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
