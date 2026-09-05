# BursaMüze UIX Pro Max V3

Bu sürümde:
- V2'deki `data-reveal { opacity:0 }` yaklaşımı kaldırıldı. Motion/CDN yüklenmese bile TÜM içerik görünür.
- Motion yalnızca progressive enhancement olarak kullanılır.
- Kullanıcının verdiği bilet dosyaları `reference/` altında birebir korunur.
- `bilet.html` artık redirect/iframe değildir. Koltuklu ve koltuksuz akış aynı BursaMüze tasarım sistemi içinde entegredir.
- Koltuk seçimi, zoom, seçilen koltuk chipleri, koltuksuz adet seçimi ve dinamik sipariş özeti çalışır.
- 1366x768 için özel `max-height:768px` booking breakpoint vardır.
- Mobilde booking ekranı tek sayfa app akışına dönüşür; sticky toplam + bottom navigation mantığı korunur.

Sayfalar:
index.html
etkinlikler.html
etkinlik-detay.html
muzeler.html
muze-detay.html
sergiler.html
bilet.html
satin-al-giris.html
satin-al-bilgiler.html
odeme.html
bilet-basarili.html
giris.html
uyelik.html
hesabim.html
okul-randevusu.html
bilet-sorgula.html
hakkimizda.html
iletisim.html
erisebilirlik.html
sss.html

Not:
Görseller prototip amaçlı uzak URL kullanır. Canlıya geçişte BursaMüze'ye ait lisanslı görsellerin AVIF/WebP olarak lokal/CDN servis edilmesi önerilir.


V40 notu: Müze listeleme sayfası tamamen yeniden tasarlandı. 13 müze için 2 kolonlu kart sistemi, yaprak animasyonlu görsel alanı, 3 dikey aksiyon butonu ve üst tanıtım blokları eklendi.

V41: Müze listeleme tasarımı keskin hatlı sisteme geri alındı. Tüm ana radiuslar kaldırıldı ve ilk görsel için perspektifli gerçek sayfa/yaprak açılma efekti uygulandı.

V51: Müze listeleme sayfasındaki rota/yuvarlak grafikler kaldırıldı. Müze detay sayfası keskin hatlı tasarım ile sıfırdan yenilendi; Müze Hakkında, Fotoğraf Galerisi, Video Galerisi, Etkinlikler, Haberler ve Ulaşım tabları eklendi.

V53: Müze detayındaki 50px beyaz breadcrumb yapısı ortak bileşen haline getirildi. Tüm içerik sayfalarındaki eski breadcrumb yapıları kaldırıldı ve common-layout.js üzerinden merkezi breadcrumb kullanımı eklendi.

V54: Header/footer logo sistemi yenilendi. Kullanıcı tarafından sağlanan beyaz BursaMüze logosu ana sayfa ve footerda beyaz kullanılıyor; iç sayfalarda koyu yeşil-siyah tona filtreleniyor. Ana sayfa header transparan, iç sayfalar siyah; Poppins menü fontu ve siyah yazılı sarı Okul Randevuları CTA standardize edildi.

V55: V54 common-layout.js string syntax hatası giderildi. Header/footer tekrar render edilir hale getirildi; şeffaf ana sayfa header, siyah iç sayfa header, Poppins menü, siyah yazılı sarı okul randevusu ve yüklenen logo sistemi korundu.

V56: İç sayfa logoları beyaz yapıldı; anasayfa header normalde şeffaf, scroll sonrası siyah olacak şekilde güncellendi. Kullanıcının iki orijinal bilet HTML referansı (masaüstü ve mobil) özellikleri/JS davranışları korunarak keskin hatlı BursaMüze tasarım sistemine uyarlandı. bilet.html ve bilet-mobile.html olarak eklendi.

V57: Bilet satın alma masaüstü sayfasında soldaki etkinlik özet kartı kaldırıldı, seçim alanı genişletildi, seans ileri/geri okları işlevsel hale getirildi ve takvim modalları viewport içine sığacak şekilde küçültüldü.

V58: Koltuk haritası masaüstünde panel genişliğine tam oturtuldu ve koltuklar büyütüldü. Mobilde 42–44px dokunma hedefleri, yatay kaydırma, sabit sol satır etiketleri ve kaydırma yönlendirmesi eklendi.

V59: bilet.html sayfasında 2. Koltuk Seçimi alanına iki sekmeli yapı eklendi. İlk sekme mevcut standart koltuk seçimi olarak korundu. İkinci sekmede solda kullanıcı tarafından verilen görsel koltuk planı, sağda ise yalnızca rakamlardan oluşan görsel plana uygun numaralı koltuk seçimi yer alır. Görsele tıklanınca büyük modal önizleme açılır.

V60: Görsel Koltuk Seçimi düzeni güncellendi. Sahne üstte konumlandırıldı; koltuk numaraları 1 numaradan başlayarak yukarıdan aşağıya düzenlendi. Son satır da dahil olmak üzere görünüm 6 kolon hizasında korunacak şekilde sabitlendi.

V61: Bilet satın alma özetinde Sepete Ekle kaldırıldı ve tek Hemen Satın Al butonu bırakıldı. Görsel koltuk seçiminde Müsait/Seçili/Dolu/Engelli renk göstergeleri eklendi. Masaüstünde görsel plan koltuk numaraları 14px yapıldı. Mobilde koltuk düzeni görseli başlangıçta kapalı, butona basınca açılır/kapanır hale getirildi.

V62: Sipariş özetindeki etkinlik görselleri kaldırıldı; etkinlik adı, seçili tarih/saat ve mekan metin olarak gösteriliyor. Koltuk seçiminde sipariş özetinde maksimum 3 koltuk satırı gösteriliyor. 3ten fazla seçimde 4. satır Toplam Bilet olarak seçili bilet sayısını göstermeye devam ediyor.

V63: Standart Koltuk Seçimi tamamen kaldırıldı. Görsel Koltuk Seçimi tek aktif seçim sistemi olarak kaldı ve sekme butonu kaldırıldı. Koltuk Seçimi başlığının hemen altında tek Müsait/Seçili/Dolu/Engelli gösterge bloğu, onun altında görsel plan ve numaralı koltuk seçim alanı yer alacak şekilde hizalandı. Tekrarlanan ikinci durum göstergesi kaldırıldı.

V64: Bilet sayfasında Görsel Koltuk Seçimi yerleşimi yeniden düzenlendi. Sol blok iki parçaya ayrıldı (durum efsanesi + koltuk düzeni görseli), sağ bloktaki Numaralı Koltuk Seçimi paneli başlık hizasından başlayacak şekilde yukarı alındı. Bozulan JavaScript kapatma satırları temizlenerek SAHNE ve numaralı koltuk alanı tekrar çalışır hale getirildi.

V65: 3ten fazla koltuk seçildiğinde sipariş özetindeki 4. alan sarı iki parçalı butona dönüştürüldü. Üst bölüm Toplam Bilet ve büyük adet, alt bölüm Tüm Biletleri Gör olarak tasarlandı. Butona basınca tüm seçili biletleri listeleyen modal açılır ve seçim sayısına göre dinamik güncellenir.

V66: 3ten fazla koltuk seçiminde sarı toplam alanı 3 + kalan = toplam formatında gösteriliyor (örn. 3 + 4 = 7). Tüm Biletleri Gör modalı DOM sırasından bağımsız çalışacak şekilde düzeltildi; modal artık seçili tüm biletleri listeliyor.

V67: Bilet akışında tarih ve seans seçimi ayrıldı. Kayan tarih kartlarından saatler kaldırıldı. Tarih seçildiğinde altında ayrı SEANSLAR alanı açılıyor; her seans saat ve kalan kapasite gösteriyor. Seans seçimi sipariş özetindeki tarih/saat bilgisini güncelliyor. Takvim modalında gün hücrelerinden saatler kaldırıldı ve yalnızca tarih seçimi yapılıyor.

V68: Sarı toplam bilet göstergesinde sabit 3 küçültüldü, ek bilet sayısı büyütüldü. Tüm Biletleri Gör modalında her bilete silme ikonu eklendi. Modal altına bilet adedi, bilet bedeli, hizmet bedeli, toplam fiyat özeti ve satin-al-giris.html sayfasına yönlendiren Hemen Satın Al butonu eklendi.

V69: Tarih seçimi sonrası açılan seans listeleri 16 seans olacak şekilde genişletildi. Masaüstünde 4 kolonlu ve gerektiğinde dikey kaydırılabilir seans paneli kullanılıyor; mobilde yatay kaydırma korunuyor. Sarı Toplam Bilet alanında ek bilet sayısı toplam bilet sayısından tam 2px daha küçük yapıldı.

V70: Seans kartlarından kalan kapasite bilgisi kaldırıldı; kartlarda yalnızca saat gösteriliyor. Seans seçildiğinde altında dinamik uyarı alanı açılıyor ve "Bu seans için alınabilecek bilet sayısı: X adettir." mesajı gösteriliyor.

V71: Mobilde koltuk düzeni görseli başlangıçta kapalı accordion yapısına alındı. Koltuk Düzenini Göster butonuna basınca görsel aşağı doğru açılıyor, tekrar basınca kapanıyor. Masaüstünde görsel sürekli açık kalıyor.

V72: Masaüstünde seans saatleri 6 kolon halinde gösterilecek şekilde düzenlendi. Tüm seans saatleri tek saat yerine başlangıç-bitiş aralığı formatına çevrildi (örn. 09:30 - 10:15). Tablet ve mobil kırılımlarında daha az kolon/yatay kaydırma davranışı korunuyor.

V73: Seans sayısı tarih başına 16dan 12ye düşürüldü. Masaüstünde 6lı yerleşim korunarak 2 satır gösteriliyor. Mobilde KOLTUK DÜZENİNİ GÖSTER/GİZLE butonu tamamen büyük harf yapıldı ve siyah yerine sarı renge çevrildi.

V74: Header ana menüsü SORGULA, MÜZELER, BİLETİNİ AL olarak yenilendi. Üç menü de kutu/button formuna dönüştürüldü; SORGULA ve MÜZELER şeffaf zemin + beyaz çizgili, BİLETİNİ AL turuncu zeminli olarak tasarlandı. Okul Randevuları CTA alanı ve hamburger menü korunuyor.

V75: Headerdaki SORGULA, MÜZELER ve BİLETİNİ AL menüleri tek ortak kutu içine alındı; aralarına dikey ayırıcı çizgiler eklendi. Üçlü menü grubu headerın sağ tarafına taşınarak OKUL RANDEVULARI butonunun hemen yanına konumlandırıldı. BİLETİNİ AL bölümünün turuncu vurgusu korundu.

V76: Headerdaki SORGULA / MÜZELER / BİLETİNİ AL ortak kutusunun dış çerçevesi daha silik beyaz yapıldı ve iç ayırıcı çizgilerle aynı yoğunluğa getirildi.

V77: Headerdaki üçlü menü grubunun dış ve iç çizgileri tamamen kaldırıldı. Menü yazıları Sorgula, Müzeler, Biletini Al şeklinde normal yazı biçimine çevrildi. Tüm menü yazıları ve ikonları beyaz yapıldı; hover/active durumunda yazı ve ikon opaklığı %50 seviyesine düşüyor. Biletini Al turuncu arka planını koruyor.

V78: Headerda Sorgula ve Müzeler beyaz metin olarak bırakıldı, hover/active turuncuya çevrildi. Biletini Al kutusuz yapıldı; turuncu metin/ikon ve hoverda sarı renk kullanıldı. Opaklık hover davranışı kaldırıldı. Yandan açılan menü tamamen yeniden tasarlandı: koyu premium panel, gelişmiş marka başlığı, hızlı Biletini Al/Okul Randevusu alanları, numaralı ve ikonlu ana navigasyon, yardımcı bağlantılar ve ayrı Giriş Yap CTA alanı eklendi; mobil kırılımı da yeniden düzenlendi.

V79: Headerda Sorgula ve Müzeler menülerinin hover/active rengi turuncudan sarıya çevrildi. Biletini Al menüsünün sarı hover davranışı korunuyor.

V80: Geniş kapsamlı sayfa yenilemesi. Aşağıdaki sayfalar mevcut eski tasarımlar baz alınmadan, keskin hatlı / border-radius olmadan ve BursaMüze'nin güncel konsept diliyle yeniden tasarlandı:
- bilet-sorgula.html
- haberler.html
- haber-detay.html
- sergiler.html
- sanal-sergiler.html (Sanal Müze listeleme)
- sanal-muze-detay.html
- akademi.html
- satin-al-giris.html (üye / üyeliksiz bireysel / üyeliksiz kurumsal seçim)
- uyelik.html
- satin-al-bilgiler.html (üyeliksiz bireysel satın alma)
- kurumsal-satin-alma.html (kurum türü ve okul seviyesine bağlı sınıf / lise / üniversite alanları)
- odeme.html
- bilet-basarili.html

Formlar örnek verilerle önceden dolduruldu. Satın alma akış linkleri birbirine bağlandı. Yeni shared style assets/css/experience-v80.css eklendi. Breadcrumb haritası ve yandan açılan premium menü yeni sayfalarla güncellendi.

V81:
- Yeni üyelik sayfasından İlçe alanı kaldırıldı.
- hesabim.html V80 konseptinde tamamen yeniden tasarlandı.
- Giriş sonrası ilk ekran üyelik tipi seçimi: Bireysel / Kurumsal.
- Bireysel üyelik: ad, soyad, e-posta, telefon, T.C./VKN, opsiyonel vergi dairesi ve fatura adresi.
- Kurumsal üyelik: firma/kurum unvanı, kurum türü, yetkili, vergi dairesi, vergi numarası, kurumsal iletişim, fatura adresi ve e-fatura bilgileri.
- Hesabım ekranında bilet, randevu, favori/kayıtlı içerik ve işlem özetleri bulunur.
- Giriş formuna örnek bilgiler eklendi.
