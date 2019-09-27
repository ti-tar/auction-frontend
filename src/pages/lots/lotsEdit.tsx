import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm, change } from "redux-form";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import moment from 'moment';
import axios from "axios";
// actions
import * as lotsActions from "../../domain/lots/actions";

// components
import CustomDatePicker from "../../components/form/datePicker/datepicker";

// interfaces
import LotCreateInterface from "../../interfaces/lotCreate";

// css
import "./styles/lotsCreateStyles.scss";
import { getStorageItem } from "../../libs/storage";

type Props = React.ReactChild & {
  handleSubmit: Function;
  createNewLot: Function;
  updateLot: Function;
  history: Function;
  match: any; // todo
  fetchLot: Function;
  lot: any; // todo
  changeFormValue: any; // todo
};

const LotsEdit: React.FC<Props> = props => {
  const {
    handleSubmit,
    createNewLot,
    updateLot,
    history,
    match: {
      params: { lotId }
    },
    lot,
    fetchLot,
    changeFormValue
  } = props;

  const [image, setImage] = useState();

  useEffect(() => {
    fetchLot(lotId);
  }, [fetchLot, lotId]);

  useEffect(() => {
    setImage(lot.image);
  }, [lot]);

  const handleBeforeSubmit = (formValues: any): any => {
    if (
      !formValues.title ||
      !formValues.currentPrice ||
      !formValues.estimatedPrice ||
      !formValues.startTime ||
      !formValues.endTime
    ) {
      toast.error("fill all fields");
      return false;
    }

    const lotToSend: LotCreateInterface = {
      title: formValues.title,
      currentPrice: parseFloat(formValues.currentPrice),
      estimatedPrice: parseFloat(formValues.estimatedPrice),
      startTime: moment(formValues.startTime).toISOString(),
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
      createNewLot(lotToSend, history);
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

        if (response && response.data && response.data.fileName) {
          changeFormValue(response.data.fileName);
          setImage(response.data.fileName);
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
          />

          <Field
            name="estimatedPrice"
            type="text"
            component="input"
            placeholder="estimatedPrice"
            autoComplete="off"
          />

          <Field
            name="startTime"
            type="text"
            component={CustomDatePicker}
          />

          <Field
            name="endTime"
            type="text"
            component={CustomDatePicker}
          />

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
      createNewLot: (newLot: LotCreateInterface, history: Function): any => ({
        type: lotsActions.createNewLot.request,
        payload: newLot,
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
      resetLot: (): any => ({ type: lotsActions.resetLot.request }),
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
