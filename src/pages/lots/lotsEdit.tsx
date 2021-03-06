import React, { useEffect, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RouteComponentProps } from "react-router-dom";
import moment from "moment";
import * as lotsActions from "../../domain/lots/actions";
import LotForm, { LotFormValues } from "../../components/form/lotForm";
import "./styles/lotsCreateStyles.scss";
import LotInterface from "../../interfaces/lot";
import { StateInterface } from "../../domain";
import { FORMS } from "../../constants";
import { UploadCoverActionType } from "../../interfaces/actionTypes";

type Props = React.ReactChild & {
  match: {
    params: { lotId: string };
  };
  handleSubmit: Function;
};

const LotsEdit: React.FC<Props & RouteComponentProps> = props => {
  const {
    match: {
      params: { lotId }
    },
    history
  } = props;

  const [image, setImage] = useState();
  const dispatch = useDispatch();

  const lot: LotInterface = useSelector((state: StateInterface) => state.lots.resource);

  const formImage: string | undefined = useSelector(
    (state: StateInterface) =>
      !!state.form && state.form[FORMS.FORM_LOT_EDIT] && state.form[FORMS.FORM_LOT_EDIT].values.image
  );

  useEffect(() => {
    if (lotId) {
      dispatch({ type: lotsActions.fetchLot.request, payload: { lotId } });
    } else {
      dispatch({ type: lotsActions.clearLot.request });
    }
  }, [dispatch, lotId]);

  useEffect(() => {
    setImage(lot.image);
  }, [lot]);

  useEffect(() => {
    setImage(formImage);
  }, [formImage]);

  const handleBeforeSubmit = (formValues: LotFormValues): void => {
    if (!formValues.title || !formValues.currentPrice || !formValues.estimatedPrice || !formValues.endTime) {
      toast.error("fill all fields");
      return;
    }

    if (!image) {
      toast.error("upload an image");
      return;
    }

    const lotToSend = {
      title: formValues.title,
      currentPrice: formValues.currentPrice,
      estimatedPrice: formValues.estimatedPrice,
      endTime: moment(formValues.endTime).toISOString(),
      description: formValues.description,
      image: image
    };

    if (lotId) {
      dispatch({
        type: lotsActions.updateLot.request,
        payload: { lotId, updatedLot: lotToSend },
        history
      });
    } else {
      dispatch({
        type: lotsActions.createLot.request,
        payload: { newLot: lotToSend },
        history
      });
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formData: FormData = new FormData();
    if (e.target.files) {
      formData.append("file", e.target.files[0]);
    }
    dispatch<UploadCoverActionType>({ type: lotsActions.uploadCover.request, payload: { formData } });
  };

  return (
    <section className="lotsCreate">
      <div className="title">{!!lotId ? "Edit Lot" : "Create Lot"}</div>

      <div className="fromWrapper">
        <LotForm onSubmit={handleBeforeSubmit} initialValues={lot} />

        <div className="coverImage">
          <label>Cover image</label>
          <div>
            <input type="file" accept=".jpg, .png, .jpeg" data-enctype="multipart/form-data" onChange={onChange} />
          </div>
          {!!image && <img src={`${process.env.REACT_APP_STATIC_API_URL}/images/lots/thumb/${image}`} alt="" />}
        </div>
      </div>
    </section>
  );
};

export default LotsEdit;
