import React from 'react';
import NewsList from '../components/NewsList';
import NewsBanner from '../components/NewsBanner';


const data = [
  {
    tagName: "Nghiên cứu khoa học",
    title: `Sinh hoạt khoa học "Từ lý thuyết nghiên cứu đến thực hành thiết kế luận văn tốt nghiệp"`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/8409/4fa9/26c400d069cc9888a8f1cffcb9fe8c26?Expires=1685318400&Signature=EMmOuJL5qxPys7PBGZCvz~J0LhXMGcajMDSVRV15nmd0URjSR-Ea0K20AJNPQYSyuzN9ZLv8IRVOr7mzKON2l-NuEwX4OPmONkw~k39Oq0G0JIT3KsKbUWsLck25W~TevQuAJq5wj89InPRBdBcsr2AxWXmeiKrFu2r0qdUvGqXbOvHJgrCgEBQOte~zXLxt2V7ISCoppkJ65rzaLnxBzDg1BtmfvGAfSk5gTaB7VzjgXafXoUwAbplJ-CTrkhfvodfFmeBfMJGj~sDAtcQ2b3x~nXlwt2prf5qwsD-f-VGwI-hWrj6vD7KFu4vTVY1XN2IX7C5EPyoFVkuCLYl53Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/c85d/7e0c/9fa22b328ec50fc4d4c8f7076b5d20f9?Expires=1685318400&Signature=OUM~uiM1Ke6Km1QrKcsnm6DiRLgufcvR~ZXrn7EMHNEZfGQE9bmx-EXlXGns2KHidddh7wHJRpriPykiwe6S9~BC65LMU5-1gNY23Xq50nXo6MKTl9r0BUMlOe3r6WBrAsrQNoCpiwgO2G2p5wqDycNjwHMhFv5~J8s1BFWNiwJKzSf3DE6NoMDiUjmBDk1Eh0bwzCIG2dcwe-P1w0X~FgMnDHIC7Bygfv9jB6Kuk6SxjSuhFyAUkHpjzP3YmCiA78YkSNjmrh6UVqkVwPf22-qPRBqOt5CqKBhk~sTEFEE0O4WwYqMSxxm2JAezytBEH4eMJhi~9qQoCGtke-CCuA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/de82/c555/804c1da6b96007d6c2768c45f2033f24?Expires=1685318400&Signature=o1mEsFo-3Z44Tf4ewEgHby3GavwgKsKFzR74bhdq47uVhNtqxNUA1TbYWO~GcETbzwJ4hBwHFjt58DoTwV7UxHSXItvLaw3dkbqqzLe1arbHokC1lUUG1RRAS-UjlodKazdqaxjvFJfoV1G~NXGfl4lkfsQo4TCYpgzOf~zgOU7Ru1cG7~HGiOM9i-qVLxmm-o99703Hj8BCWKAbbEMRYRSRcdfturl1IlCXbXWQ1cboynHtjK-7aWYZ76hxle5hZ-Z6tRvTNVaQXxQhqvOTii-smXcyQXDaC0GFEFoKFhhsZRxJ-R3mXZXDz0j7gHIll-Ee9nNlo6g0n~ECdm514w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/8ce0/9f4f/0f9dc21052c153e24b9da35deae16c18?Expires=1685318400&Signature=VsWIoCK3b6IZ2S9yVea58ReffyrhLnoFaL6v0KktZyRm~on-HaiWZFC48fwNocS~Z12w8EWyw5JBJqINOSdVqzg~b7lI--gUPUqHIb7XK8wzccQYJsGdXZ2FOME3IungWsDB9y2RZV33v~Fmf-AONKpfSbYjdjEQ~0Odexw~pyvT2B0fH3KFbJhHo1ovWbJg84Uq0yfg9lW9cuA0RtxVajxtmkPhvD-tarofnMn9DYA~ywiS05lFcd6Lc6yTD4JQrxioR9P~WZJ8Ol7blfFXTCgzLjI6zth98iLSZ~i40XU4h1J2b--UcpWfEXMs38VGX0SUpJMlpDL45pn~ZrEZ~w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/d23b/ad98/a428888d00edfc7037fe1cc446e314a7?Expires=1685318400&Signature=E5E2ZfYz5Vs385LhpDVBrkkZljRI4WUf4gInb3MnkF4f4e5zdKYl75JfigUSvC1iBz6JD7qFSpsg6MbmBLWsXB08-5DJa2L-GSROt7YaKZaU121kfPQpOAjCXjs4cOxe1evARnqjlF6lXXuOPchk0FU48i3G7MR-djqkffECfNmo9DzVObYvz4tEzXfyuzNwqtZTN-F4MA5uI1Q3zvtJlYoSZZE1D-rUQa4OwZPXiayYYdGg8jHfOl0CteeSv3d-7cW5bV0e-k0Mho7ifQLL0NL7CoAayTMSB0IqNyVY4ArP5F7ZfMsfY-7R-hCVuTGZRpui2ckbwhptITXS39cxjw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/0e70/722c/6679f953248e929a5be8d8600e12dfa3?Expires=1685318400&Signature=hEnhWSkVTCsfqz95iRs7OmcbRBkbBT1XienFT5gWyTj8KiR8kaGSoK~eWybJsNcNl5EYuqberHdU3KeotI81L3cmj41T23B-TGaaNo9ghzp~lCjc3489mbL-WZ4a~YBi0Ju3FCRLJgOt1MatWQuDJODP46HO~FJfIJ-ECyAiw3pmklMFcfqxt4tEuEZw52P4vZCCAWvQBxwhJ7VZ5PO12zZwHES3sJ7uxiTtcsSkJjIvehLsOf8SNUhTLGTcLYG6eWSrb17NpoU774dBv2NrrfWv2WNzeBy6HU5ZZ~B1V9rZxMWbioWvJySZMlgeW5PHYdUQ2xBZ0Jietxd5-ew1Tw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
];

const bannerItem = [
  {
    tagName: "Nghiên cứu khoa học",
    title: `Đẩy mạnh nghiên cứu về chính trị Hàn Quốc trong bối cảnh Việt Nam - Hàn Quốc trở thành Đối tác chiến lược toàn diện`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/d29a/c635/df41ed8ec7be47b0d03160c7b8033c67?Expires=1685318400&Signature=Ebo9jqM~lqQF0bsGea1SqjLAVvuXXNWRLB6P~tHLT9msrqB6gY0r4B8JHh8pjpfZJcfrifEOODT3dOtG4eixOYNB08UD2yADApbCJZl3kgMvekt2cWeZsiHp3I9ooJLKCoqs4fAwcJfhAP54-lknPeD9KlbiHjVp3NH~1waV~ihcR4MtvITP6wgFlgT8xbu8ZxouSFbf5vk~jIofc0GZlGv9K7RStIeCgvMmKcaFLIp3FzM9JgvES3FV5saMraOnQc~QXeZdS-iRHyI0T1LYYozNU73RgOL3X5-jJFvTcWLmcqt4f10-CbMhW0FRPv6Q8APIWLel9ok1AwwXAUQegQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Chia sẻ kinh nghiệm trong xây dựng giáo trình tiếng Hàn`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/2e18/b998/5a61c4695f9de8d45304260573eff4a4?Expires=1685318400&Signature=Z-K8KVsB4bMEC9zmpTTftYTzGubJSFxDt1sUiL8BjEYYWqb~39xer7diTp8HEQYBVHcmxtkdLzQ9scs97k7ymGyI~3rp6cWBOSeR6TDq6cG9SplS2QcH6z3qvv1nKatigj-dySuOP0M93McYkgL6dQmIjGmfnEKaYPiRUvjAnbSiKdoe7EQ2a-pa8nFhn27AnRbNhOA69FzaxK7ef07Jdrj~3purz40fyW0AOqmvXCqN0UqNuBFsB-VNzJJzDGF-g3zGrbv6gnzSN559ys0y4MNv6lapMd9aoaCYI~wMnuNGVsvcw0ZeceHConr1Z7IHdgAgb~s3USSRuPAJz1CaaQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
];

const StudentNews = () => {
    return (
        <div className="w-rp  justify-between items-center mb-[120px] ">
            <NewsBanner newsBanner={bannerItem}/>
            <NewsList  newsItem={data}/>
        </div>
      );
}

export default StudentNews