import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm, change } from "redux-form";
import { toast } from "react-toastify";
import { RouteComponentProps, withRouter } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import * as lotsActions from "../../domain/lots/actions";
import CustomDatePicker from "../../components/form/datePicker/datepicker";
import LotCreateInterface from "../../interfaces/lotCreate";
import { getStorageItem } from "../../libs/storage";

import "./styles/lotsCreateStyles.scss";
import LotInterface from "../../interfaces/lot";

type Props = React.ReactChild & {
  match: {
    params: { lotId: string };
  };
  handleSubmit: Function;
  createLot: Function;
  updateLot: Function;
  fetchLot: Function;
  lot: LotInterface;
  changeFormValue: Function;
};

const LotsEdit: React.FC<Props & RouteComponentProps> = props => {
  const {
    match: {
      params: { lotId }
    },
    handleSubmit,
    createLot,
    updateLot,
    history,
    lot,
    fetchLot,
    changeFormValue
  } = props;

  const [image, setImage] = useState();

  useEffect(() => {
    if (lotId) {
      fetchLot(lotId);
    }
  }, [fetchLot, lotId]);

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
      updateLot(lotToSend, lotId, history);
    } else {
      createLot(lotToSend, history);
    }
  };

  const onChange = (e: any) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);

    // receive two parameter endpoint url ,form data
    axios
      .post("http://localhost:5000/api/lots/upload", data, {
        headers: { Authorization: `Bearer ${getStorageItem("token")}` }
      })
      .then(response => {
        // then print response status

        if (
          response &&
          response.data &&
          response.data.file &&
          response.data.file.fileName
        ) {
          changeFormValue(response.data.file.fileName);
          setImage(response.data.file.fileName);
        }
      })
      .catch(err => {
        console.warn("Some error has occurred");
      });
  };

  return (
    <section className="lotsCreate">
      <div className="title">{!!lotId ? "Edit Lot" : "Create Lot"}</div>

      <div className="fromWrapper">
        <form onSubmit={handleSubmit(handleBeforeSubmit)}>
          <Field
            name="title"
            type="text"
            component="input"
            placeholder="title"
            autoComplete="off"
          />

          <Field
            name="currentPrice"
            type="text"
            component="input"
            placeholder="currentPrice"
            autoComplete="off"
            parse={(value: string): number => parseFloat(value)}
          />

          <Field
            name="estimatedPrice"
            type="text"
            component="input"
            placeholder="estimatedPrice"
            autoComplete="off"
            parse={(value: string): number => parseFloat(value)}
          />

          <Field name="endTime" type="text" component={CustomDatePicker} />

          <Field
            name="description"
            component="textarea"
            placeholder="description"
          />

          <Field
            name="image"
            type="hidden"
            component="input"
            placeholder="image"
          />

          <div className="submitBtn">
            <button type="submit">Submit</button>
          </div>
        </form>

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

const LotsEditRouteComponent: any = compose(
  withRouter,
  connect(
    (state: any, ownProps: any) => {
      const { lotId } = ownProps.match.params;
      return {
        lot: state.lots.resource,
        initialValues: lotId ? state.lots.resource : {}
      };
    },
    {
      createLot: (newLot: LotCreateInterface, history: Function): any => ({
        type: lotsActions.createLot.request,
        payload: { newLot },
        history
      }),
      updateLot: (
        updatedLot: LotCreateInterface,
        lotId: string,
        history: Function
      ): any => ({
        type: lotsActions.updateLot.request,
        payload: { lotId, updatedLot },
        history
      }),
      fetchLot: (lotId: string): any => ({
        type: lotsActions.fetchLot.request,
        payload: { lotId }
      }),
      changeFormValue: (fileName: string) =>
        change("form-lots-edit", "image", fileName)
    }
  ),
  reduxForm({
    form: "form-lots-edit",
    enableReinitialize: true
  })
)(LotsEdit);

export default LotsEditRouteComponent;
