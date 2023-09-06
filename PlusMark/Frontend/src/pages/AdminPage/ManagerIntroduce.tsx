import IntroduceForm from "@components/Form/IntroduceForm";
import LoadingScreen from "@components/LoadingScreen";
import BtnLoading from "@components/btn-loading/BtnLoading";
import IntroServices from "@services/IntroServices";
import { useEffect, useState } from "react";

export interface Introduce {
  id: number,
  name: string,
  titleVn: string,
  titleKr: string,
  content1_Vn: string,
  content1_Kr: string,
  content2_Vn: string,
  content2_Kr: string,
  introductionImage: Array<IntroductionImage> | []
}

export interface IntroductionImage {
  url: string
}

const defaultIntro = [
  {
    id: 0,
    name: 'INTRO',
    titleVn: '',
    titleKr: '',
    content1_Vn: '',
    content1_Kr: '',
    content2_Vn: '',
    content2_Kr: '',
    introductionImage: []
  },
  {
    id: 0,
    name: 'INTRO_MARKETMOA',
    titleVn: '',
    titleKr: '',
    content1_Vn: '',
    content1_Kr: '',
    content2_Vn: '',
    content2_Kr: '',
    introductionImage: []
  }
]

function ManagerIntroduce() {
  const [introduces, setIntroduces] = useState<Array<Introduce>>(defaultIntro);
  const [loading, setLoading] = useState<boolean>(false);
  const activedIntro: {
    [x: string]: Introduce
  } = {
    'INTRO': {
      id: 0,
      name: 'INTRO',
      titleVn: '',
      titleKr: '',
      content1_Vn: '',
      content1_Kr: '',
      content2_Vn: '',
      content2_Kr: '',
      introductionImage: []
    },
    'INTRO_MARKETMOA': {
      id: 0,
      name: 'INTRO_MARKETMOA',
      titleVn: '',
      titleKr: '',
      content1_Vn: '',
      content1_Kr: '',
      content2_Vn: '',
      content2_Kr: '',
      introductionImage: []
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await IntroServices.get();
        const data: any = response;
        
        let transformedIntros = data.map((introData: any) => {
          const intro: Introduce = {
            id: introData.id,
            name: introData.name,
            titleVn: introData.titleVn,
            titleKr: introData.titleKr,
            content1_Vn: introData.content1Vn,
            content1_Kr: introData.content1Kr,
            content2_Vn: introData.content1Vn,
            content2_Kr: introData.content2Kr,
            introductionImage: introData.images
          };
          return intro;
        });
        transformedIntros.sort((a:any, b:any) => a.name.localeCompare(b.name));
        console.log(transformedIntros)

        const objIntros = transformedIntros.reduce(
          (obj: Introduce, item: Introduce) => Object.assign(obj, { [item.name]: item }), {})
        const newIntros = Object.keys(activedIntro).map((item) => {
          const idx = Object.keys(objIntros).indexOf(item)
          if (idx !== -1) {
            return {
              ...activedIntro[item],
              id: objIntros[item].id,
              titleVn: objIntros[item].titleVn,
              titleKr: objIntros[item].titleKr,
              content1_Vn: objIntros[item].content1_Vn,
              content1_Kr: objIntros[item].content1_Kr,
              content2_Vn: objIntros[item].content2_Vn,
              content2_Kr: objIntros[item].content2_Kr,
              introductionImage: objIntros[item].introductionImage
            }
          }
          return activedIntro[item]
        })
        setIntroduces(newIntros)
      } catch (ex) {
        console.log(ex);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="pt-9 pb-10px flex-1 px-10">
      <IntroduceForm intros={introduces} />
    </div>

  );
}

export default ManagerIntroduce;
