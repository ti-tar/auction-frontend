import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RouteComponentProps, withRouter } from "react-router-dom";
import moment from "moment";
import * as lotsActions from "../../domain/lots/actions";
import LotForm from "../../components/form/lotForm";
import LotCreateInterface from "../../interfaces/lotCreate";
import "./styles/lotsCreateStyles.scss";
import LotInterface from "../../interfaces/lot";
import { StateInterface } from "../../domain";

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

  const lot: LotInterface = useSelector(
    (state: StateInterface) => state.lots.resource
  );

  useEffect(() => {
    if (lotId) {
      // fetchLot(lotId);
      dispatch({ type: lotsActions.fetchLot.request, payload: { lotId } });
    }
  }, [dispatch, lotId]);

  useEffect(() => {
    setImage(lot.image);
  }, [lot]);

  const handleBeforeSubmit = (formValues: any): any => {
    if (
      !formValues.title ||
      !formValues.currentPrice ||
      !formValues.estimatedPrice ||
      !formValues.endTime
    ) {
      toast.error("fill all fields");
      return false;
    }

    const lotToSend: LotCreateInterface = {
      title: formValues.title,
      currentPrice: formValues.currentPrice,
      estimatedPrice: formValues.estimatedPrice,
      endTime: moment(formValues.endTime).toISOString()
    };

    if (formValues.description) {
      lotToSend.description = formValues.description;
    }
    if (formValues.image) {
      lotToSend.image = formValues.image;
    }

    if (lotId) {
      // updateLot(lotToSend, lotId, history);
      dispatch({
        type: lotsActions.updateLot.request,
        payload: { lotId, updatedLot: lotToSend },
        history
      });
    } else {
      // createLot(lotToSend, history);
      dispatch({
        type: lotsActions.createLot.request,
        payload: { newLot: lotToSend },
        history
      });
    }
  };

  const onChange = (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    dispatch({ type: lotsActions.uploadCover.request, payload: { formData } });

    // change("form-lots-edit", "image", response.data.file.fileName);
    //           setImage(response.data.file.fileName);
  };

  return (
    <section className="lotsCreate">
      <div className="title">{!!lotId ? "Edit Lot" : "Create Lot"}</div>

      <div className="fromWrapper">
        <LotForm onSubmit={handleBeforeSubmit} initialValues={lot} />

        <div className="coverImage">
          <label>Cover image</label>
          <div>
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              data-enctype="multipart/form-data"
              onChange={onChange}
            />
          </div>
          {!!image && (
            <img
              src={`${process.env.REACT_APP_STATIC_API_URL}/images/lots/thumb/${image}`}
              alt=""
            />
          )}
        </div>
      </div>
    </section>
  );
};

const LotsEditRouteComponent: any = withRouter(LotsEdit);

export default LotsEditRouteComponent;
