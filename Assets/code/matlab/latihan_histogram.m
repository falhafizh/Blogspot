% Belajar membuat Histogram Gambar di Matlab Android (Matlab Mobile)
% Source/Reference: 
% https://www.mathworks.com/help/images/create-image-histogram.html
% https://pemrogramanmatlab.com/pengolahan-citra-digital/histogram-citra-digital/

Img = imread('buah_apel.jpg');
R = Img(:,:,1); 
G = Img(:,:,2);
B = Img(:,:,3);

Red = cat(3,R,G*0,B*0);
Green = cat(3,R*0,G,B*0);
Blue = cat(3,R*0,G*0,B);
Gray = rgb2gray(Img);

rmap = zeros(256,3); 
rmap(:,1) = 0:255; 
rmap = rmap/255;
gmap = zeros(256,3);
gmap(:,2) = 0:255;
gmap = gmap/255;
bmap = zeros(256,3);
bmap(:,3) = 0:255;
bmap = bmap/255;

% Histogram RGB Buah Apel
figure
subplot(1,2,1)
imshow(Img);
title('Citra RGB')
subplot(1,2,2)
histogram(R(:),256,'FaceColor','r','EdgeColor','r')
hold on
histogram(G(:),256,'FaceColor','g','EdgeColor','g')
histogram(B(:),256,'FaceColor','b','EdgeColor','b')
set(gca,'XLim',[0 255])
set(gca,'YLim',[0 10000])
title('Histogram Citra')
xlabel('Intensitas Piksel Warna')
ylabel('Frekuensi/Jumlah Piksel')
hold off

% Histogram Channel Red Buah Apel
figure
subplot(1,2,1)
imshow(Red), colormap(rmap), colorbar
title('Citra Channel Red')
subplot(1,2,2)
histogram(R(:),256,'FaceColor','r','EdgeColor','r')
set(gca,'XLim',[0 255])
set(gca,'YLim',[0 10000])
title('Histogram Citra')
xlabel('Intensitas Piksel Warna')
ylabel('Frekuensi/Jumlah Piksel')
grid on

% Histogram Channel Green Buah Apel
figure
subplot(1,2,1)
imshow(Green), colormap(gmap), colorbar
title('Citra Channel Green')
subplot(1,2,2)
histogram(G(:),256,'FaceColor','g','EdgeColor','g')
set(gca,'XLim',[0 255])
set(gca,'YLim',[0 10000])
title('Histogram Citra')
xlabel('Intensitas Piksel Warna')
ylabel('Frekuensi/Jumlah Piksel')
grid on

% Histogram Channel Blue Buah Apel
figure
subplot(1,2,1)
imshow(Blue), colormap(bmap), colorbar
title('Citra Channel Blue')
subplot(1,2,2)
histogram(B(:),256,'FaceColor','b','EdgeColor','b')
set(gca,'XLim',[0 255])
set(gca,'YLim',[0 10000])
title('Histogram Citra')
xlabel('Intensitas Piksel Warna')
ylabel('Frekuensi/Jumlah Piksel')
grid on

% Histogram Channel Grayscale Buah Apel
figure
subplot(1,2,1)
imshow(Gray), colormap(gray), colorbar
title('Citra Grayscale')
subplot(1,2,2)
histogram(Gray(:),256,'FaceColor',[.5 .5 .5],'EdgeColor',[.5 .5 .5])
set(gca,'XLim',[0 255])
set(gca,'YLim',[0 10000])
title('Histogram Citra')
xlabel('Intensitas Piksel Warna')
ylabel('Frekuensi/Jumlah Piksel')
grid on
