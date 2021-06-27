import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  ButtonGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

function Tables() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Precios Cazados</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Nombre</th>
                      <th>País</th>
                      <th>Ciudad/Provincia</th>
                      <th className="text-center">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Arroz</td>
                      <td>Argentina</td>
                      <td>Córdoba</td>
                      <td className="text-center">$236,73</td>
                    </tr>
                    <tr>
                      <td>Huevos</td>
                      <td>Colombia</td>
                      <td>Barranquilla</td>
                      <td className="text-center">$23,78</td>
                    </tr>
                    <tr>
                      <td>Café</td>
                      <td>Chile</td>
                      <td>Santiago</td>
                      <td className="text-center">$56,14</td>
                    </tr>
                    <tr>
                      <td>Cerveza</td>
                      <td>Perú</td>
                      <td>La Paz</td>
                      <td className="text-center">$38,75</td>
                    </tr>
                    <tr>
                      <td>Celular</td>
                      <td>Argentina</td>
                      <td>Buenos Aires</td>
                      <td className="text-center">$63.542</td>
                    </tr>
                    <tr>
                      <td>Agua</td>
                      <td>Chile</td>
                      <td>Antofagasta</td>
                      <td className="text-center">$78,15</td>
                    </tr>
                    <tr>
                      <td>Papa</td>
                      <td>Uruguay</td>
                      <td>Montevideo</td>
                      <td className="text-center">$98,65</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Desafíos(6)</h6>
                <p className="card-category d-inline">Hoy</p>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Últimos
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Antiguos
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Ver Todos
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Cazar 100 precios de Huevos</p>
                          <p className="text-muted">
                            Perú, Lima, Coquimbito 8:47 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Editar Desafío
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Cazar 10 precios de Lacteos</p>
                          <p className="text-muted">
                            Chile, Santiago, Caprese 9:09 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip457194718"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip457194718"
                            placement="right"
                          >
                            Editar Desafío
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Cazar 25 precios de Heladeras</p>
                          <p className="text-muted">
                            Argentina, Mendoza, Luján De Cuyo 16:30 PM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip362404923"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip362404923"
                            placement="right"
                          >
                            Editar Desafío
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Cazar 5 precios de Celulares</p>
                          <p className="text-muted">
                            Colombia, Bogotá, Cipreses 11:19 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip818217463"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip818217463"
                            placement="right"
                          >
                            Editar Desafío
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">
                            Cazar 360 precios de Zapatillas
                          </p>
                          <p className="text-muted">
                            Brazil, Brasilia, Joao Pereyra 22:00 PM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip831835125"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip831835125"
                            placement="right"
                          >
                            Editar Desafío
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Cazar 70 precios de verduras </p>
                          <p className="text-muted">
                            Argentina, Buenos Aires, Escobar 12:34 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip217595172"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip217595172"
                            placement="right"
                          >
                            Editar Desafío
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Precios Cazados</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Nombre</th>
                      <th>País</th>
                      <th>Ciudad/Provincia</th>
                      <th className="text-center">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Arroz</td>
                      <td>Argentina</td>
                      <td>Córdoba</td>
                      <td className="text-center">$236,73</td>
                    </tr>
                    <tr>
                      <td>Huevos</td>
                      <td>Colombia</td>
                      <td>Barranquilla</td>
                      <td className="text-center">$23,78</td>
                    </tr>
                    <tr>
                      <td>Café</td>
                      <td>Chile</td>
                      <td>Santiago</td>
                      <td className="text-center">$56,14</td>
                    </tr>
                    <tr>
                      <td>Cerveza</td>
                      <td>Perú</td>
                      <td>La Paz</td>
                      <td className="text-center">$38,75</td>
                    </tr>
                    <tr>
                      <td>Celular</td>
                      <td>Argentina</td>
                      <td>Buenos Aires</td>
                      <td className="text-center">$63.542</td>
                    </tr>
                    <tr>
                      <td>Agua</td>
                      <td>Chile</td>
                      <td>Antofagasta</td>
                      <td className="text-center">$78,15</td>
                    </tr>
                    <tr>
                      <td>Papa</td>
                      <td>Uruguay</td>
                      <td>Montevideo</td>
                      <td className="text-center">$98,65</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
